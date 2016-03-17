"use strict";

(function (angular) {
  angular
    .module("ProgrammesListApp")
    .controller("ListCtrl", Controller)
  ;

  Controller.$inject = ["$http"];

  function Controller($http) {
    var vm = this;
    vm.alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    vm.selectedTab = vm.alphabet[0];
    vm.programmes = [];
    vm.programmesPerPage = 10;
    vm.programmesTotal = 0;
    vm.currentPage = 1;
    vm.imageSize = '192x108';

    vm.selectTab = selectTab;
    vm.loadProgrammesList = loadProgrammesList;
    vm.changePage = changePage;

    activate();

    function activate() {
      loadProgrammesList();
    }

    function selectTab(tab) {
      vm.selectedTab = tab;
      vm.currentPage = 1;
      loadProgrammesList();
    }

    function loadProgrammesList(pageNumber) {
      var baseApiUrl = "https://ibl.api.bbci.co.uk/ibl/v1/atoz/";
      var url = baseApiUrl + vm.selectedTab + "/programmes";
      if (pageNumber) {
        url += "?page=" + pageNumber;
        vm.currentPage = pageNumber;
      }

      $http.get(url)
        .then(function(response) {
          updateParametersOnResponse(response);
        });
    }

    function updateParametersOnResponse(response) {
      var result = response && response.data && response.data.atoz_programmes;

      if (result) {
        if (result.elements) {
          vm.programmes = result.elements;
        }

        if (result.per_page) {
          vm.programmesPerPage = result.per_page;
        }

        vm.programmesTotal = result.count;
      }
    }

    function changePage(pageNumber) {
      loadProgrammesList(pageNumber);
    }
  }

}(angular));