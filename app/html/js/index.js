function MainCtrl($scope, $http,  $modal) {

    $scope.orderByField = 'proposaldate';
    $scope.reverseSort = true;

    $scope.alerts= [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.loadTalks = function()
	{
        $scope.alerts.push({msg: 'Chargement des talks',type: 'info'});
        if ($scope.alerts.length > 1) {
            $scope.alerts.shift();
        }
        $http({method: 'GET', url: '/api_proposal.json'}).
            success(function(data, status, headers, config) {
                $scope.alerts.push({msg: 'Chargement OK',type: 'success'});
                if ($scope.alerts.length > 1) {
                    $scope.alerts.shift();
                }
                $scope.proposals=data;
            }).
            error(function(data, status, headers, config) {
                $scope.alerts.push({msg: 'Chargement KO',type: 'danger'});
                if ($scope.alerts.length > 1) {
                    $scope.alerts.shift();
                }
            });

	}

    $scope.loadTalks();


    $scope.openModal = function (size,talk,template) {

        var modalInstance = $modal.open({
            templateUrl: template,
            size: size,
            controller: ModalInstanceCtrl,
            resolve: { talk: function () {
                return talk ;
            } }
        });
    }
}

var app =angular.module('cfpces',['ui.bootstrap']);


var ModalInstanceCtrl = function ($scope, $modalInstance, talk) {

    $scope.talk = talk;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

