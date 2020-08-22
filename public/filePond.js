FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginFilePoster,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginImageValidateSize
);
FilePond.setOptions({
    stylePanelAspectRatio:15/40,
    allowFileTypeValidation:true,
    labelFileTypeNotAllowed:'File of invalid type'
});

FilePond.create(document.querySelector('.Aadhar'), {
    acceptedFileTypes: ['image/jpeg', 'image/png', 'images/gif'],
    maxFileSize:"1MB"  
});

FilePond.parse(document.body);