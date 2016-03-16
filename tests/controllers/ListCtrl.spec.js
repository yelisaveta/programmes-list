"use strict";

(function() {
  describe("ListCtrl", function() {

    beforeEach(module("ProgrammesListApp"));

    var ctrl, scope;

    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();

      ctrl = $controller("ListCtrl", {
        $scope: scope
      });
    }));

    it("should have alphabet values set", function() {
      expect(ctrl.alphabet).toBeDefined();
      expect(ctrl.alphabet).toEqual(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);
    });


  });
}());