describe('preview tests', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('filePreviewer'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should create an file input element', function() {
        var element = $compile("<button file-preview>Test</button>")($rootScope);

        var input = angular.element('body').find('input')[0];

        expect(input).toBeDefined();
        expect(input.style.left).toBe('-800px');
    });
});