



        

    $(document).ready(function () {
        $('#PurchaseOrderTableContainer').jtable({
            title: 'Table of PurchaseOrders',
            paging: true,
            pageSize: 10,
            actions: {
                
                listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/api/purchaseOrders',
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
                            url: '/api/purchaseOrders',
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
                            url: '/api/purchaseOrders',
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
                            url: '/api/purchaseOrder',
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
                
                purchaseDate: {
                    title: 'Purchase Date',
                    width: '30%'
                },
                
                paidDate: {
                    title: 'Paid Date',
                    width: '30%',
                },

                supplier: {
                    title: 'Supplier',
                    width: '40%',
                    edit: false,
                },
            }



        });

        $('#PurchaseOrderTableContainer').jtable('load');
    });
