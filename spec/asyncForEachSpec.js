fdescribe("AsyncForEach", function() {
    let asyncForEach = require('../asyncForEach.js');

    let foo, bar = null;

    beforeEach(function() {
        foo =  {
            async: asyncForEach
        };

    });

    it("should be called 1 time", function() {
        spyOn(foo, 'async');

        foo.async([1, 2, 3], foo.bar);
        expect(foo.async).toHaveBeenCalled();
    });

    it("should be called 5 times", function(done) {
        let baz = jasmine.createSpy('baz');
        foo.bar = function(item, index, next) {
            setTimeout(function(){
                    baz();
                    next();
                }, 10);
            };

        foo.async([1, 2, 3, 4, 5], foo.bar);

        setTimeout(function(){
            expect(baz).toHaveBeenCalledTimes(5);
            done();
        }, 1000);

    });

    it("should have appropriate arguments", function(done) {
        let baz = jasmine.createSpy('baz');
        foo.bar = function(item, index, next) {
            setTimeout(function(){
                    baz(item, index);
                    next();
                }, 10);
            };

        foo.async([1, 2, 3], foo.bar);

        setTimeout(function(){
            expect(baz.calls.argsFor(0)).toEqual([1, 0]);
            expect(baz.calls.argsFor(1)).toEqual([2, 1]);
            expect(baz.calls.argsFor(2)).toEqual([3, 2]);
            done();
        }, 1000);

    });
});