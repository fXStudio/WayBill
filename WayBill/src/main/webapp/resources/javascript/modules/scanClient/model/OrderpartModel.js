Ext.define('ScanClientModule.model.OrderpartModel', {
    extend: 'Ext.data.Model',
    
    fields: [
             'id', 'partno', 'pkgcount', 
             'totalcount', 'orderid', 'pkgquantity', 'orderno', 'partdesc', 'isscan',
             'leastCount'
    ]
}); 