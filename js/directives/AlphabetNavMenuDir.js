(function(angular) {
  angular
    .module("ProgrammesListApp")
    .directive("alphabetNavMenu", Directive)
  ;

  function Directive() {
    return {
      templateUrl: "views/alphabet.tmpl.html",
      controller: "ListCtrl",
      bindToController : true,
      controllerAs : "lc"
    };
  }
})(angular);