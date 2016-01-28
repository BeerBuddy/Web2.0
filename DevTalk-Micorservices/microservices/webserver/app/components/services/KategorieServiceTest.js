/**
 * Created by David on 10.12.2015.
 */
(function () {

    'use strict';

    describe("tests the KategorieService", function () {
        var kategorieService;
		var $rootScope;
        beforeEach(function () {
            module('DevTalk.kategorien');
            inject(function (_KategorieService_,_$rootScope_) {
				$rootScope = _$rootScope_;
                kategorieService = _KategorieService_;
            });
        });
		
		
        //check if all functions exists
        describe('test KategorieService functions for existence', function () {
            it('should have the query', function () {
                expect(kategorieService.query).toBeDefined();
            });

            it('should have the get', function () {
                expect(kategorieService.get).toBeDefined();
            });

            it('should have the save', function () {
                expect(kategorieService.save).toBeDefined();
            });

            it('should have the update', function () {
                expect(kategorieService.update).toBeDefined();
            });
			
			it('should have the delete', function () {
                expect(kategorieService.delete).toBeDefined();
            });
        });

	/*
        describe('KategorieService.get  and KategorieService.insert', function () {
            //insert new kategorie
           var kategorieToinsert =  {
                "name": "Test",
            };
            it('should inster an kategorie', function () {
			var kategorie2;
                //console.info("KategorieService -----------: "+kategorieService);
               var kategorie = kategorieService.save(kategorieToinsert, function(kategorie){
					 //get from service
					kategorie2 = kategorieService.get({"id_": kategorie._id});
					
				});
				$rootScope.$apply();
				expect(kategorie2).toEqual(kategorie);
            });
        });

        describe('KategorieService.query', function () {
            it('should return an non Empty List', function () {
              var kategories = kategorieService.query();
				$rootScope.$apply();
                expect(kategories).toBeDefined();
                expect(kategories.length).toBeGreaterThan(0);
            });
        });


        describe('KategorieService.insert update get Test', function () {
            //create new
            var kategorieToinsert =  {
                "name": "Test",
            };
            it('should insert a kategorie and change it', function () {
			var kategorie3_, kategorie4_;
                //insert new kategorie
                kategorieService.save(kategorieToinsert, function(kategorie){
					 //get from service
					kategorieService.get({'id':kategorie._id},function (kategorie2) {
						//check if equals
						expect(kategorie2).toEqual(kategorie);

						//do a change
						kategorie2.name = "Neuer Test";

						//update
						kategorieService.update(kategorie2,function (kategorie3){
							kategorie3_ = kategorie3;
							expect(kategorie3).toEqual(kategorie2);
							
							kategorieService.get({'id':kategorie3._id},function (kategorie4){
								kategorie4_ = kategorie4;
							});			
						});
					});
				});
				$rootScope.$apply();
				expect(kategorie3_).toEqual(kategorie4_);
            });
        });

        describe('KategorieService.get unknown id', function () {
			var kategorie = {
                'id': "unknown id"
            };
            it('should throw a exception', function () {
               var err;
                    kategorieService.get(kategorie, function(suc){}, function(err){
						err_ =err;
            		});
					
				$rootScope.$apply();
				expect(err_).toBeDefined();
                
            });
        });

        describe('KategorieService.update unknown kategorie', function () {
            var kategorie = {
                'id': "unknown id"
            };
            it('should throw a exception', function () {
               var err;
                    kategorieService.update(kategorie, function(suc){}, function(err){
						err_ =err;
            		});
				$rootScope.$apply();
				expect(err_).toBeDefined();
            });
        });
		*/
    });

})();
