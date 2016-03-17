"use strict";

(function (angular) {
  angular
    .module("ProgrammesListApp")
    .controller('ListCtrl', Controller)
  ;

  Controller.$inject = [];

  function Controller() {
    var vm = this;
    vm.alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    vm.selectedTab = vm.alphabet[0];
    vm.selectTab = selectTab;

    activate();

    function activate() {

    }

    function selectTab(tab) {
      vm.selectedTab = tab;
    }
  }

}(angular));