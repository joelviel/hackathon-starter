



        

    $(document).ready(function () {
        $('#ProductTableContainer').jtable({
            title: 'Table of Products',
            paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'name ASC',
            actions: {
                
                listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/api/products',
                            type: 'GET',
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                },
                
                createAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/api/products',
                            type: 'POST',
                            dataType: 'json',
                            beforeSend: function(req){req.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"));},
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function (data) {
                                $dfd.reject();
                            }
                        });
                    });
                },

                updateAction: function(postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/api/products',
                            type: 'PUT',
                            dataType: 'json',
                            beforeSend: function(req){req.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"));},
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                },
                


                deleteAction: function(postData) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/api/products',
                            type: 'DELETE',
                            dataType: 'json',
                            beforeSend: function(req){req.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"));},
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                }


            },


            fields: {
                _id: {
                    key: true,
                    list: false
                },
                
                name: {
                    title: 'Name',
                    width: '30%'
                },
                
                description: {
                    title: 'Description',
                    width: '40%',
                    type: 'textarea'
                },

                 currentQty: {
                    title: 'Current Qty',
                    width: '15%',
                    edit: false,
                },

                soldQty: {
                    title: 'Sold Qty',
                    width: '15%',
                    edit: false,
                    create: false
                },
            }



        });

        $('#ProductTableContainer').jtable('load');
    });
