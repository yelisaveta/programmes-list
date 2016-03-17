"use strict";

(function() {
  describe("ListCtrl", function() {

    beforeEach(module("ProgrammesListApp"));

    var ctrl, scope, httpBackend;
    var apiBaseUrl = "https://ibl.api.bbci.co.uk/ibl/v1/atoz";
    var apiResponse = {
      atoz_programmes: {
        character: "a",
        count: 68,
        page: 1,
        per_page: 20,
        elements: [
          {
            title: "Abadas",
            images: {
              type: "image",
              standard: "http://ichef.bbci.co.uk/images/ic/{recipe}/p017mqg6.jpg"
            }
          },
          {
            title: "A Blackpool Big Band Boogie: Jools Holland and his Rhythm & Blues Orchestra",
            images: {
              type: "image",
              standard: "http://ichef.bbci.co.uk/images/ic/{recipe}/p02xb2ks.jpg"
            }
          }
        ]
      }
    };

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      httpBackend.when("GET").respond(apiResponse);

      ctrl = $controller("ListCtrl", {
        $scope: scope
      });
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe("controller initialization", function() {
      afterEach(function() {
        httpBackend.flush();
      });

      it("should have correct values set", function() {
        expect(ctrl.alphabet).toBeDefined();
        expect(ctrl.alphabet).toEqual(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);

        expect(ctrl.programmes).toBeDefined();
        expect(ctrl.programmes).toEqual([]);

        expect(ctrl.programmesPerPage).toBeDefined();
        expect(ctrl.programmesPerPage).toEqual(10);

        expect(ctrl.programmesTotal).toBeDefined();
        expect(ctrl.programmesTotal).toEqual(0);
      });

      it("should initially set selected tab to 'a'", function() {
        expect(ctrl.selectedTab).toBeDefined();
        expect(ctrl.selectedTab).toEqual("a");
      });

      it("should have method to change selected tab", function() {
        expect(ctrl.selectTab).toBeDefined();
        expect(typeof ctrl.selectTab).toBe("function");
      });

      it("should be able to change selected tab", function() {
        var tab = "b";
        ctrl.selectTab(tab);

        expect(ctrl.selectedTab).toEqual(tab);
      });

      it("should have method to load list of programmes", function() {
        expect(ctrl.loadProgrammesList).toBeDefined();
        expect(typeof ctrl.loadProgrammesList).toBe("function");
      });

      it("should load programmes list", function() {
        httpBackend.expectGET(apiBaseUrl + "/a/programmes");
      });

    });

    describe("loading programmes list", function() {

      it("should send HTTP request to load programmes", function() {
        httpBackend.expectGET(apiBaseUrl + "/a/programmes");
        ctrl.loadProgrammesList();
        httpBackend.flush();
      });

      it("should use selected tab to load programmes", function() {
        var tab = "b";
        ctrl.selectTab(tab);

        httpBackend.expectGET(apiBaseUrl + "/b/programmes");
        ctrl.loadProgrammesList();
        httpBackend.flush();
      });

      it("should set list of programmes in controller", function() {
        ctrl.loadProgrammesList();
        httpBackend.flush();

        expect(ctrl.programmes).toBeDefined();
        expect(ctrl.programmes).toEqual(apiResponse.atoz_programmes.elements);
      });

      it("should set number of programmes per page in controller", function() {
        ctrl.loadProgrammesList();
        httpBackend.flush();

        expect(ctrl.programmesPerPage).toBeDefined();
        expect(ctrl.programmesPerPage).toEqual(20);
      });

      it("should set total number of programmes in controller", function() {
        ctrl.loadProgrammesList();
        httpBackend.flush();

        expect(ctrl.programmesTotal).toBeDefined();
        expect(ctrl.programmesTotal).toEqual(68);
      });

      it("should load programmes list when selected tab changes", function() {
        httpBackend.expectGET(apiBaseUrl + "/c/programmes");

        var tab = "c";
        ctrl.selectTab(tab);

        httpBackend.flush();
      });

    });
  });
}());