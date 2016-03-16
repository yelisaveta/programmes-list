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

  });
}());