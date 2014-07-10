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
                .then(function(){
                    scope.filePreview({file: file});
                });
            };

            reader.readAsDataURL(file);
        });
    };

    return {
        scope: {
            filePreview: '&'
        },
        link: link
    };
}]);