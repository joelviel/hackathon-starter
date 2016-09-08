



        

    $(document).ready(function () {
        $('#ProductTableContainer').jtable({
            title: 'Table of Products',

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
                    width: '40%'
                },
                
                description: {
                    title: 'Description',
                    width: '40%'
                },

                 qty: {
                    title: 'Quantity',
                    width: '20%'
                },
            }



        });

        $('#ProductTableContainer').jtable('load');
    });
