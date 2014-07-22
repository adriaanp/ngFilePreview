'use strict';

angular.module('filePreviewer', ['ui.bootstrap'])
.directive('filePreview', ['$modal', function ($modal) {
    function link(scope, elem, attrs) {
        var input = $('<input type="file" style="position: fixed; left: -800px" />');
        $('body').append(input);

        elem.on('click', function () {
            input.click();
        });

        elem.on('$destroy', function () {
            input.remove();
        });

        input.on('change', function (e) {
            var file = e.target.files[0];

            var reader = new FileReader();
            reader.onload = function (e) {
                file.data = e.target.result;

                scope.fp = {
                    file: file,
                    havePreview: file.data.indexOf('data:image') === 0
                };

                $modal.open({
                    templateUrl: 'previewTemplate.html',
                    scope: scope
                }).result
                .then(function () {
                    scope.filePreview({ file: file });
                });
            };

            reader.readAsDataURL(file);
            e.target.value = "";
        });
    };

    return {
        scope: {
            filePreview: '&'
        },
        link: link
    };
}])
.run(['$templateCache', function ($templateCache) {
    $templateCache.put('previewTemplate.html', 
    '<div class=\"modal-header\">\n' +
    '   <h4 class=\"modal-title\">Uploading file: {{fp.file.name}}</h4>\n' +
    '</div>\n' +
    '<div class=\"modal-body\">\n' +
    '   <p ng-if=\"!fp.havePreview\">No Preview available for current file.</p>\n' +
    '   <img ng-if=\"fp.havePreview\" ng-src=\"{{fp.file.data}}\" class=\"fp-img-preview\" />\n' +
    '</div>\n' +
    '<div class=\"modal-footer\">\n' +
    '   <button class=\"btn btn-primary\" ng-click=\"$close()\" >Upload File</button>\n' +
    '   <button class=\"btn btn-default\" ng-click=\"$dismiss()\">Cancel</button>\n' +
    '</div>');
}]);
