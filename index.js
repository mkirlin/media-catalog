var MediaCatalog = angular.module("MediaCatalog", ["firebase"]);

MediaCatalog.controller('CatalogCtrl', function CatalogCtrl($scope, $firebaseAuth, $firebaseArray) {
    var url = "https://resplendent-inferno-8604.firebaseio.com/";
    var db = new Firebase(url);
    $scope.auth = $firebaseAuth(db);
    $scope.items = $firebaseArray(new Firebase(url + 'items'))
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });

    $scope.addItem = function() {
        $scope.items.$add({
            name: $scope.itemName,
            type: $scope.itemType,
            description: $scope.itemDescription
        }).then(function() {
            $('#addItemModal').modal('hide')
            $scope.alert = 'Item added.'
        }).catch(function(error) {
            $scope.error = error.message;
        });
    };

    $scope.deleteItem = function() {
        var item = $scope.items[this.$index]
        $scope.items.$remove(item).then(function() {
            $scope.alert = 'Item deleted.'
        }).catch(function(error) {
            $scope.error = error.message;
        });
    };

    $scope.login = function() {
        $scope.message = null;
        $scope.error = null;

        $scope.auth.$authWithPassword({
            email: $scope.loginEmail,
            password: $scope.loginPassword
        }).then(function(authData) {
            $scope.loginEmail = ''
            $scope.loginPassword = ''
        }).catch(function(error) {
            if(error.code === 'INVALID_PASSWORD' || error.code === 'INVALID_USER' || error.code === 'INVALID_EMAIL') {
                $scope.error = error.message
            } else {
                console.log(error.code)
                $scope.error = "You must enter both an email and a password."
            }
        });
    };

    $scope.createUser = function() {
        $scope.message = null;
        $scope.error = null;

        $scope.auth.$createUser({
            email: $scope.addUserEmail,
            password: $scope.addUserPassword
        }).then(function(userData) {
            $('#addUserModal').modal('hide')
            $scope.alert = 'User created.'
        }).catch(function(error) {
            if(error.code === 'INVALID_PASSWORD' || error.code === 'INVALID_USER' || error.code === 'INVALID_EMAIL') {
                $scope.error = error.message
            } else {
                console.log(error.code)
                $scope.error = "You must enter both an email and a password."
            }
        });
    };
})
