angular
    .module('ngSharepoint.Users', ['ngSharepoint'])
    .run(['$sp', '$spLoader', function($sp, $spLoader) {
        if ($sp.getAutoload()) {
            if ($sp.getConnectionMode() === 'JSOM') {
                $spLoader.loadScript('SP.Userprofiles.js');
            }
        }
    }]);
