function getSurvey($scope, $http) {
  getting();
 function getting(){
    $http.get("/ankete")
    .then(function(response) {
        $scope.myWelcome = response.data;
    });
}
};