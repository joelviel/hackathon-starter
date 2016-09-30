
    $(document).ready(function () {
        $('#SupplierTableContainer').jtable({
            title: 'Table of Suppliers',
            paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'name ASC',
            actions: {
                
                listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/api/suppliers',
                            type: 'GET',
                            dataType: 'json',
                            data: jtParams,
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
                            url: '/api/suppliers',
                            type: 'POST',
                            dataType: 'json',
                            data: postData,
                            beforeSend: function(req){req.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"));},
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
                            url: '/api/suppliers',
                            type: 'PUT',
                            dataType: 'json',
                            data: postData,
                            beforeSend: function(req){req.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"));},
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
                            url: '/api/suppliers',
                            type: 'DELETE',
                            dataType: 'json',
                            data: postData,
                            beforeSend: function(req){req.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"));},
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
                    width: '20%'
                },
                address: {
                    title: 'Address',
                    width: '30%',
                    type: 'textarea'
                },
                phone: {
                    title: 'Phone',
                    width: '15%',
                },
                company: {
                    title: 'Company',
                    width: '15%'
                },
                email: {
                    title: 'Email',
                    width: '20%'
                }

            }


        });

        $('#SupplierTableContainer').jtable('load');
    });
