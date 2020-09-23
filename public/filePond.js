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

FilePond.create(document.getElementById("file1"), {
    acceptedFileTypes: ['image/jpeg', 'image/png', 'images/gif'],
    maxFileSize:"350KB"  
});
FilePond.create(document.getElementById("file2"), {
    acceptedFileTypes: ['image/jpeg', 'image/png', 'images/gif'],
    maxFileSize:"350KB"  
});
FilePond.create(document.getElementById("file3"), {
    acceptedFileTypes: ['image/jpeg', 'image/png', 'images/gif'],
    maxFileSize:"350KB"  
});
FilePond.create(document.getElementById("file4"), {
    acceptedFileTypes: ['image/jpeg', 'image/png', 'images/gif'],
    maxFileSize:"350KB"  
});

FilePond.parse(document.body);