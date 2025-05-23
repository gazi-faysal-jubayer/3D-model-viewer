const { AuthenticationClient, Scopes } = require('@aps_sdk/authentication');
const { OssClient, Region, PolicyKey } = require('@aps_sdk/oss');
const { ModelDerivativeClient, View, OutputType } = require('@aps_sdk/model-derivative');
const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_BUCKET } = require('../config.js');

const authenticationClient = new AuthenticationClient();
const ossClient = new OssClient();
const modelDerivativeClient = new ModelDerivativeClient();

const service = module.exports = {};

async function getInternalToken() {
    try {
        const credentials = await authenticationClient.getTwoLeggedToken(APS_CLIENT_ID, APS_CLIENT_SECRET, [
            Scopes.DataRead,
            Scopes.DataCreate,
            Scopes.DataWrite,
            Scopes.BucketCreate,
            Scopes.BucketRead
        ]);
        return credentials.access_token;
    } catch (err) {
        console.error('Error getting internal token:', err);
        throw new Error('Failed to authenticate with Autodesk Platform Services');
    }
}

service.getViewerToken = async () => {
    try {
        const credentials = await authenticationClient.getTwoLeggedToken(APS_CLIENT_ID, APS_CLIENT_SECRET, [Scopes.ViewablesRead]);
        return credentials;
    } catch (err) {
        console.error('Error getting viewer token:', err);
        throw new Error('Failed to get viewer token');
    }
};

service.ensureBucketExists = async (bucketKey) => {
    const accessToken = await getInternalToken();
    try {
        await ossClient.getBucketDetails(bucketKey, { accessToken });
    } catch (err) {
        if (err.axiosError?.response?.status === 404) {
            try {
                await ossClient.createBucket({
                    bucketKey: bucketKey,
                    policyKey: PolicyKey.Persistent,
                    region: Region.Us
                }, { accessToken });
            } catch (createError) {
                console.error('Failed to create bucket:', createError);
                throw createError;
            }
        } else {
            console.error('Error checking bucket:', err);
            throw err;
        }
    }
};

service.listObjects = async () => {
    await service.ensureBucketExists(APS_BUCKET);
    const accessToken = await getInternalToken();
    try {
        let resp = await ossClient.getObjects(APS_BUCKET, { limit: 64, accessToken });
        let objects = resp.items;
        while (resp.next) {
            const startAt = new URL(resp.next).searchParams.get('startAt');
            resp = await ossClient.getObjects(APS_BUCKET, { limit: 64, startAt, accessToken });
            objects = objects.concat(resp.items);
        }
        return objects;
    } catch (err) {
        console.error('Error listing objects:', err);
        throw new Error('Failed to list models');
    }
};

service.uploadObject = async (objectName, filePath) => {
    await service.ensureBucketExists(APS_BUCKET);
    const accessToken = await getInternalToken();
    try {
        const obj = await ossClient.uploadObject(APS_BUCKET, objectName, filePath, { accessToken });
        return obj;
    } catch (err) {
        console.error('Error uploading object:', err);
        throw new Error('Failed to upload model');
    }
};

service.translateObject = async (urn, rootFilename) => {
    const accessToken = await getInternalToken();
    try {
        const job = await modelDerivativeClient.startJob({
            input: {
                urn,
                compressedUrn: !!rootFilename,
                rootFilename
            },
            output: {
                formats: [{
                    views: [View._2d, View._3d],
                    type: OutputType.Svf2
                }]
            }
        }, { accessToken });
        return job.result;
    } catch (err) {
        console.error('Error translating object:', err);
        throw new Error('Failed to process model');
    }
};

service.getManifest = async (urn) => {
    const accessToken = await getInternalToken();
    try {
        const manifest = await modelDerivativeClient.getManifest(urn, { accessToken });
        return manifest;
    } catch (err) {
        if (err.axiosError?.response?.status === 404) {
            return null;
        } else {
            console.error('Error getting manifest:', err);
            throw new Error('Failed to get model status');
        }
    }
};

service.urnify = (id) => Buffer.from(id).toString('base64').replace(/=/g, '');