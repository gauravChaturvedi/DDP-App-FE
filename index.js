(function($) {
	"use strict";
  $(".results-table").hide();

  var dropdownItemList = ["Albany","Alpine","Amador City","Antioch","Apple Valley","Bakersfield","Baldwin Park","Banning","Beaumont","Bell","Bellflower","Belmont","Benicia","Benton","Berkeley","Bethel Island","Beverly Hills","Big Bear City","Big Pine","Bishop","Cabazon","Camarillo","Campo","Capitola","Carmichael","Carpinteria","Carson","Castro Valley","Castroville","Ceres","Cerritos","Chico","Chino","Chino Hills","Chowchilla","Chula Vista","Citrus Heights","Clearlake","Coachella","Coalinga","Concord","Corona","Crockett","Del Mar","Downey","El Cajon","El Centro","El Dorado","El Portal","Fontana","Glendale","Half Moon Bay","Hemet","Highland","Indio","Ione","Jamestown","Julian","Junction City","Kelseyville","Kingsburg","La Canada Flintridge","La Crescenta","La Mesa","La Quinta","Lakeport","Long Beach","Los Angeles","Los Gatos","Lucerne","Lynwood","Madera","Malibu","Mammoth Lakes","Manhattan Beach","Manteca","Marina","Marina del Rey","Markleeville","Mecca","Merced","Middletown","Modesto","Montrose","Moss Landing","Mount Laguna","Murphys","Oakhurst","Olympic Valley","Orcutt","Palm Desert","Pasadena","Placerville","Planada","Ramona","Rancho Palos Verdes","Redcrest","Redway","Reedley","Rolling Hills Estates","Rosemead","Roseville","Rowland Heights","Running Springs","Sacramento","Salida","Salinas","Salton City","San Anselmo","San Bernardino","San Bruno","San Carlos","San Dimas","San Fernando","San Gabriel","San Jacinto","San Jose","San Mateo","San Rafael","Seaside","Simi Valley","Solana Beach","Soledad","Solvang","Sonora","South Lake Tahoe","South Pasadena","South San Francisco","Spring Valley","Torrance","Trinidad","Truckee","Twain Harte","Valencia","Vallejo","Visalia","Willits","Willow Creek"];

	var dropdownItemList2 = ["American","Asian","Bakery","Barbecue","Brewery","Burgers","CafÈ","Californian","Chinese","Delicatessen","Dessert","Ethiopian","Fast food","French","German","Greek","Hawaiian","Indian","Italian","Italian, Pizza","Japanese","Latin","Mediterranean","Mexican","Middle Eastern","Pizza","Seafood","Steakhouse","Sushi","Thai","Vegetarian","Vietnamese"];

  var rdropdown = new Array(), j = -1;
  rdropdown[++j] ='<ul style="height: auto; max-height: 200px; overflow-x: hidden;">';
  for (var i = 0; i < dropdownItemList2.length; i++){
     rdropdown[++j] ='<button class="dropdown-item" type="button">' + dropdownItemList2[i] + '</button>';
  }
  rdropdown[++j] ='</ul>';
 $('.dropdown-menu').html(rdropdown.join(''));

  var nomenclature_dictionary = {
    0: 'Best Opportunity',
    1: 'Second Best',
    2: 'Third Best',
    3: 'Fourth Best',
    4: 'Fifth Best'
  }

  $("#fetch-cities-button").click(function(e){
    e.preventDefault();
    var dropdownValue = $('#dropdownMenu2').val();
    if (dropdownValue && dropdownValue.length > 0) {
      $.get("http://localhost:5000/fetch-cities/" + dropdownValue, function(data, status){
        var apiData = JSON.parse(data);
        $(".results-table").show();
        var r = new Array(), j = -1;
        r[++j] ='<thead><tr><th></th><th>City</th><th>Opportunity Score</th><th># of ' + dropdownValue + ' Restaurants</th><th>Population</th><th>' + dropdownValue + ' Restaurants Per Capita</th></tr></thead>';
        r[++j] ='<tbody>';
        for (var i = 0; i < apiData.length; i++){
           if (apiData[i].Opp_Score > 0) {
              r[++j] ='<tr style="background-color: #D8EECF;">';
           } else {
             r[++j] ='<tr>';
           }
           r[++j] ='<td>';
           r[++j] = nomenclature_dictionary[i];
           r[++j] ='</td>';
           r[++j] ='<td>';
           r[++j] = apiData[i].City;
           r[++j] ='</td>';
           r[++j] ='<td>';
           r[++j] = apiData[i].Opp_Score;
           r[++j] ='</td>';
           r[++j] ='<td>';
           r[++j] = apiData[i].no_of_restaurants;
           r[++j] ='</td>';
           r[++j] ='<td>';
           r[++j] = apiData[i].Population;
           r[++j] ='</td>';
           r[++j] ='<td>';
           r[++j] = apiData[i].RPC;
           r[++j] ='</td>';
           r[++j] = '</tr>';
        }
       $('#data-table').html(r.join(''));
      });
    }
  });

  $(".dropdown-item").click(function(){
    $("#dropdownMenu2").text($(this).text());
     $("#dropdownMenu2").val($(this).text());
  });

  console.log('okay deoude !');
})(jQuery);
