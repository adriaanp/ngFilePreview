'use strict';

angular.module('filePreviewer', [])
.directive('openFileDialog', [function () {
    return {
        scope: {
            fileInput: '@openFileDialog'
        },
        link: function (scope, elem, attrs) {
            elem.on('click', function (e) {
                document.getElementById(scope.fileInput).click();
            });
        }
    }
}])

.directive('filePreview', [function () {
    function link(scope, elem, attrs) {
        debugger;
        elem.on('click', function () {
            elem.find('input')[0].click();
        });

        elem.find('input').on('change', function () {
            var file = elem.find('input')[0].files[0];

            var reader = new FileReader();
            reader.onload = function (e) {
                scope.$apply(function () {
                    scope.imgSrc = e.target.result;

                });
            };

            reader.readAsDataURL(file);
        });
    };

    return {
        templateUrl: 'previewTemplate.html',
        scope: {},
        link: link
    };
}]);