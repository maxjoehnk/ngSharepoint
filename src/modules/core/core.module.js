angular
    .module('ngSharepoint', [])
    .run(function($sp, $spLoader) {
        if ($sp.getAutoload()) {
            if ($sp.getConnectionMode() === 'JSOM') {
                var scripts = [
                    '//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js',
                    'SP.Runtime.js',
                    'SP.js'
                ];
                $spLoader.loadScripts('SP.Core', scripts);
            }else if ($sp.getConnectionMode() === 'REST' && !$sp.getAccessToken()) {
                $spLoader.loadScript('SP.RequestExecutor.js');
            }
        }
    });
