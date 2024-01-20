var newAddrData = null;

var latitude = 0;
var altitude = 0;

latitude = $("#latitude").data("value");
altitude = $("#altitude").data("value");

var apiKeyMap = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3N2VlOGUyMmFlZTVhZjQ4YzJjNmVlNDg1MTBmMTQ4MmE0MTcyOGE2N2Y3ZDg5MmYyMmNkMzQ0MGUwNWVkYjQ0NTQwYTkxYjIyMzdhMzFjIn0.eyJhdWQiOiIxOTQxOCIsImp0aSI6ImE3N2VlOGUyMmFlZTVhZjQ4YzJjNmVlNDg1MTBmMTQ4MmE0MTcyOGE2N2Y3ZDg5MmYyMmNkMzQ0MGUwNWVkYjQ0NTQwYTkxYjIyMzdhMzFjIiwiaWF0IjoxNjYyODk3ODA5LCJuYmYiOjE2NjI4OTc4MDksImV4cCI6MTY2NTU3OTgwOSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.qdEbX0m4jziLci0rpJVVgqFre-z9z2AjopNmAW8RmKJq4qBaLyUMa81YzTby7-GD9enq_G_-598xDnZup3H5yR2XbxmaT4QhZoOz6lDfY68t-_fffH8AQja-VdY0OBpkiTUg4AP4Ta-lexE5LLINqNbJCvwJV0sHyBPHTkbv1pb1Ax5nU_lLAbFwDJZ_5l9_H6mNVwR5d4xQGCKWPnVYQQG6Vukqh_iajIJ-YGDNIuP3fOQlBz4XPdUwzAzNIibW_yioMcRIm38kfxqFqePc6ZpI4zyb4HWx4maIWYYx2GRf4uFNZiB7gcWtyksNZppTKav8f9Rlv6D7xWqsntLUKA";

$(document).ready(function () {

    var hasLocation = latitude == 0 || altitude == 0 ? false : true
    var app = new Mapp({
        element: '#ContentLocation',
        presets: {
            latlng: {
                lat: hasLocation ? latitude : 35.6995,
                lng: hasLocation ? altitude : 51.3370
            },
            zoom: hasLocation ? 16 : 6
        },
        apiKey: apiKeyMap
    });
    app.addLayers();



    if (hasLocation) {
        app.markReverseGeocode({
            state: {
                latlng: {
                    lat: latitude,
                    lng: altitude,
                },
                zoom: 16,
            },
        });
    }

    /* app.map.on('click', function (e) {
 
         app.findReverseGeocode({
             state: {
                 latlng: {
                     lat: e.latlng.lat,
                     lng: e.latlng.lng
                 },
                 zoom: 16
             },
             after: function (addr) {
                 newAddrData = addr;
 
                 address = newAddrData.address
                 address_compact = newAddrData.address_compact;
 
                 $('#modal-SaveLocation').modal('show');
                 $("#Location_LastAddr").text(oldAddress);
                 $("#Location_NewAddr").text(address_compact);
                 $("#Location_Latitude").text(e.latlng.lat);
                 $("#Location_Altitude").text(e.latlng.lng);
             }
         });
 
         app.addMarker({
             name: 'advanced-marker',
             latlng: {
                 lat: e.latlng.lat,
                 lng: e.latlng.lng
             },
             icon: app.icons.red,
             popup: false
         });
     });
 
 
 
     $('#SaveLocation').click(function () {
         if (newAddrData != null) {
             latitude = $("#Location_Latitude").text();
             altitude = $("#Location_Altitude").text();
 
             $("#latitude").val(latitude);
             $("#altitude").val(altitude);
 
             var isChangeAddrLocation = $('#ChangeAddrLocation').is(':checked');
             if (isChangeAddrLocation) {
 
                 Ostan = newAddrData.province; //استان
                 Shahrestan = newAddrData.county; // شهرستان
                 City = newAddrData.city; // شهر
                 Region = newAddrData.region;//منطقه
                 Street = newAddrData.primary; // خیابان
                 Alley = newAddrData.last; // کوچه
                 Plack = newAddrData.plaque;//پلاک
                 ZipCode = newAddrData.postal_code; //کد پستی
 
                 $('#Ostan').val(Ostan);
                 $('#Shahrestan').val(Shahrestan);
                 $('#Region').val(Region);
                 $('#City').val(City);
                 $('#Street').val(Street);
                 $('#Alley').val(Alley);
                 $('#Plack').val(Plack);
                 $('#ZipCode').val(ZipCode);
             }
             $('#modal-SaveLocation').modal('hide');
             $('#modal-Location').modal('hide');
         }
 
     });*/
});