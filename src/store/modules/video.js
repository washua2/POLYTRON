import { reactive } from "vue";

export const state = reactive({
    isPreview: false,
    isPreviewUrl:"",
    isUpload: false,
    isUploadImage: false,
    isCreateProfile: false,
    isAddDeviceShow: true,
    isDeviceDetailShow: false,
});

export const methods = {
    setPreview(preview,url) {
        state.isPreview = preview;
        state.isPreviewUrl = url;
    },
    setUpload(upload) {
        state.isUpload = upload;
    },
    setUploadImage(upload) {
        state.isUploadImage = upload;
    },
    setCreateProfile(createProfile) {
        state.isCreateProfile = createProfile;
    },
    setAddDeviceShow(addDeviceShow) {
        state.isAddDeviceShow = addDeviceShow;
    },
    setDeviceDetailShow(deviceDetailShow) {
        state.isDeviceDetailShow = deviceDetailShow;
    }
};




export default { state, methods };
