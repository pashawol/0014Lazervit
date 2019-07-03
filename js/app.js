(function() {
    var vm = new Vue({
        el: '#app',
        data: {
            step: 1,
            images: "",
            time: false,
            bolezn: false,
            rast: false,
            color: false, 
            travma: false, 
            krov: false,
            tel: "",
            disabled: true,
            disabled_step1: true,
            // disabled_step2: true,
        },
        computed: {

            disabled_step2: function() {
                if(this.time){
                    return false;
                }else{
                    return true;
                }
            },
       

        },
        mounted: function() {
            var self = this;
            Dropzone.autoDiscover = false;
            $(".dropzone").dropzone({
                url: "/file/upload.php",
                addRemoveLinks: true,
                maxFilesize: 2,
                acceptedFiles: 'image/*',
                init: function() {
                    this.on("error", function(file, message) { 
                                 alert('Ошибка загрузки.Максимальный размер 2MiB');
                                 this.removeFile(file); 
                     });
                    this.on("success", function(file, responseText) {
                        if (responseText == "ok") {
                            var v = self.images.split(",");
                            if (v.length == 1 && v[0] == "") {
                                self.images = file.name;
                            } else {
                                v.push(file.name);
                                self.images = v.join();
                            }
                            self.disabled_step1=false;
                        }
                    });
                    this.on('removedfile', function(file) {
                        var name = file.name;
                        var v = self.images;
                        v = v.split(",");
                        for (var i = 0; i < v.length; i++) {
                            if (name == v[i]) {
                                v.splice(i, 2)
                            }
                        }
                        self.images = v.join();
                        if(self.images.length<1){
                            self.disabled_step1=true;
                        }
                        //удаляем на сервере
                        $.ajax({
                            type: 'POST',
                            url: "/file/delete.php",
                            data: {
                                name: name,
                            },
                            success: function(data) {}
                        });
                    });
                }
            });
        },
        methods: {
            setStep: function(step) {
                this.step = step;
                if(typeof dataLayer!=="undefined"){
                    dataLayer.push({'event': 'step'+(step-1)});
                }
            },
            setPhone: function(e) {
                var v = $(e.target).inputmask('unmaskedvalue');
                if (v.length == 10) {
                    this.tel = v;
                } else {
                    this.tel = false;
                }
            },
            submit: function() {
                var self = this;
                this.disabled = true;

                $.ajax({
                    url: '/action_calc.php',
                    type: 'POST',
                    data: {
                        images: self.images,
                        time: self.time,
                        bolezn: self.bolezn,
                        rast: self.rast,
                        color: self.color,
                        travma: self.travma,
                        krov: self.krov,
                        tel: self.tel,
                    },
                }).done(function() {
                    self.step = 9;
                    if(typeof dataLayer!=="undefined"){
                        dataLayer.push({'event': 'ok-kviz'});
                    }
                }).fail(function() {
                    alert('Произошла ошибка.Попробуйте позже.')
                }).always(function() {
                    self.disabled = false;
                });
            }
        }
    });
})()