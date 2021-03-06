angular
    .module('ngSharepoint.Lists')
    .factory('SPList', function($sp, $spLog, CamlBuilder, RestSPList, JsomSPList) {
        //TODO: Add all List APIs
        /**
        * @ngdoc object
        * @name  SPList
        * @param {string} title The List Title
        *
        * @module  ngSharepoint.Lists
        *
        * @description
        * SPList represents a Sharepoint List
        */
        var SPList = function(title) {
            this.title = title;
            if ($sp.getConnectionMode() === 'JSOM') {
                this.__list = new JsomSPList(title);
            }else {
                this.__list = new RestSPList(title);
            }
        };

        SPList.prototype.getGUID = function() {
            return this.__list.getGUID().catch($spLog.error);
        };

        SPList.prototype.getTitle = function() {
            return this.__list.getTitle().catch($spLog.error);
        };

        SPList.prototype.setTitle = function(title) {
            return this.__list.setTitle(title).catch($spLog.error);
        };

        SPList.prototype.getDescription = function() {
            return this.__list.getDescription().catch($spLog.error);
        };

        SPList.prototype.setDescription = function(desc) {
            return this.__list.setDescription(desc).catch($spLog.error);
        };
        /**
        * @ngdoc function
        * @name  SPList#create
        * @param  {object} data The Data you wanna create
        * @return {Promise}      A Promise which resolves when the insertion was sucessful
        */
        SPList.prototype.create = function(data, serializer) {
            return this.__list.create(data, serializer).catch($spLog.error);
        };
        /**
        * @ngdoc function
        * @name  SPList#read
        * @param {string} query A CamlQuery to filter for
        * @return {Promise} A Promise which resolves to the selected data
        */
        SPList.prototype.read = function(query, serializer) {
            return this.__list.read(query, serializer).catch($spLog.error);
        };
        /**
        * @ngdoc function
        * @param  {string} query  A CamlQuery which selects the rows to update
        * @param  {object} data The Data you wanna update
        * @return {Promise}        A Promise which resolves when the update was sucessfull
        */
        SPList.prototype.update = function(query, data, serializer) {
            return this.__list.update(query, data, serializer).catch($spLog.error);
        };
        /**
        * @ngdoc function
        * @param  {string} query A CamlQuery to filter for
        * @return {Promise}       [description]
        */
        SPList.prototype.delete = function(query) {
            return this.__list.delete(query).catch($spLog.error);
        };
        /**
         * @ngdoc function
         * @param  {object} query [description]
         * @return {Promise}       [description]
         */
        SPList.prototype.query = function(query) {
            if (angular.isObject(query)) {
                return this.__jsonQuery(query);
            }
        };
        SPList.prototype.__jsonQuery = function(query) {
            if (angular.isDefined(query.type)) {
                var builder = new CamlBuilder();
                builder.buildFromJson(query);
                var caml;
                if (!builder.isEmpty()) {
                    caml = builder.build();
                }
                switch (query.type) {
                    case 'create':
                        if (angular.isDefined(query.data)) {
                            return this.create(query.data, query.serializer);
                        }else {
                            throw 'Query Data is not defined';
                        }
                        break;
                    case 'read':
                        return this.read(caml, query.serializer);
                    case 'update':
                        if (angular.isDefined(query.data)) {
                            return this.update(caml, query.data, query.serializer);
                        }else {
                            throw 'Query Data is not defined';
                        }
                        break;
                    case 'delete':
                        return this.delete(caml);
                }
            }else {
                throw 'Query Type is not defined';
            }
        };
        return (SPList);
    });
