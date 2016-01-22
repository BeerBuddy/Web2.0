/**
 * Created by David on 10.12.2015.
 */
(function () {

    'use strict';

    describe("tests the KategorieService", function () {
        var kategorieService;
        beforeEach(function () {
            module('DevTalk.kategorien');
            inject(function (_KategorieService_) {
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


        describe('KategorieService.get  and KategorieService.insert', function () {
            //insert new kategorie
           var kategorieToinsert =  {
                "name": "Test",
            };
            it('should inster an kategorie', function () {
                //console.info("KategorieService -----------: "+kategorieService);
                kategorieService.save(kategorieToinsert, function(kategorie){
					 //get from service
					var kategorie2 = kategorieService.get(kategorie._id, function(){
						//check if equals
						expect(kategorie2).toEqual(kategorie);
					});
				});
            });
        });

        describe('KategorieService.query', function () {
            it('should return an non Empty List', function () {
              kategorieService.query(function(kategories){
				expect(kategories).toBeDefined();
                expect(kategories.length).toBeGreaterThan(0);
				});
                
            });
        });


        describe('KategorieService.insert update get Test', function () {
            //create new
            var kategorieToinsert =  {
                "name": "Test",
            };
            it('should insert a kategorie and change it', function () {
                //insert new kategorie
                kategorieService.save(kategorieToinsert, function(kategorie){
					 //get from service
					kategorieService.get({'_id':kategorie._id},function (kategorie2) {
						//check if equals
						expect(kategorie2).toEqual(kategorie);

						//do a change
						kategorie2.name = "Neuer Test";

						//update
						kategorieService.update(kategorie2,function (kategorie3){
						
							expect(kategorie3).toEqual(kategorie2);
							
							kategorieService.get({'_id':kategorie3._id},function (kategorie4){
								expect(kategorie3).toEqual(kategorie4);
							});			
						});
					});
				});
            });
        });

        describe('KategorieService.get unknown id', function () {
			var kategorie = {
                "_id": "unknown id"
            };
            it('should throw a exception', function () {
               
                    kategorieService.get(kategorie, function(suc){}, function(err){
						expect(err).toBeDefined();
            		});
                
            });
        });

        describe('KategorieService.update unknown kategorie', function () {
            var kategorie = {
                "_id": "unknown id"
            };
            it('should throw a exception', function () {
               
                    kategorieService.update(kategorie, function(suc){}, function(err){
						expect(err).toBeDefined();
            		});
               
            });
        });
    });

})();
