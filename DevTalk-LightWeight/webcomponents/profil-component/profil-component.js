'use strict';

Polymer({
    is: "profil-component",
    flip: function (event) {
        event.preventDefault();
        this.$.card.classList.toggle('flipped');
    },
    checkUser: function(user)
    {
        if(user.name != undefined && user.name != '' && user.name.length > 2) {
            document.querySelector("#account_username").classList.add('correct');
            document.querySelector("#account_username").classList.remove('wrong');
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            if (re.test(user.email)){
                document.querySelector("#account_email").classList.add('correct');
                document.querySelector("#account_email").classList.remove('wrong');
                if (user.password != undefined && user.password != '' && user.password.length > 5 && user.password === user.repassword)
                {
                    document.querySelector("#account_password").classList.add('correct');
                    document.querySelector("#account_password").classList.remove('wrong');
                    document.querySelector("#account_password_confirmation").classList.add('correct');
                    document.querySelector("#account_password_confirmation").classList.remove('wrong');

                    return true;
                }
                else
                {
                    document.querySelector("#account_password").classList.remove('correct');
                    document.querySelector("#account_password").classList.add('wrong');
                    document.querySelector("#account_password_confirmation").classList.remove('correct');
                    document.querySelector("#account_password_confirmation").classList.add('wrong');
                }
            }else
            {
                document.querySelector("#account_email").classList.remove('correct');
                document.querySelector("#account_email").classList.add('wrong');
            }
        }else
        {
            document.querySelector("#account_username").classList.remove('correct');
            document.querySelector("#account_username").classList.add('wrong');
    }

        return false;

    },
    getUser: function()
    {
        var image = document.querySelector(".edit .user-image").getAttribute("src");
        var name = document.querySelector("#account_username").value;
        var email = document.querySelector("#account_email").value;
        var password = document.querySelector("#account_password").value;
        var repassword = document.querySelector("#account_password_confirmation").value;
        return {name: name,email: email, image: image, password: password, repassword:repassword };
    },
    ready: function () {
        var that = this;
        //register change listener
        var inputs = document.querySelectorAll(".edit input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('change', function () {
                var0, user = that.getUser();
                if(that.checkUser(user))
                {
                    that.$.save.classList.remove('hide');
                }
            }, false);
        }


        //show the new image if it's selected
        //TODO was ist schneller ?  document.querySelector("#account_image") oder this.$.account_image
        document.querySelector("#account_image").addEventListener('change', function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                document.querySelector(".edit .user-image").setAttribute("src", event.target.result);
            }
            //when the file is read it triggers the onload event above.
            reader.readAsDataURL(this.files[0]);
        }, false);


    },
    save: function()
    {
        this.user = this.getUser();
        this.fire(this.onsave());
    },

    properties: {
        user: {
            type: Object,
            editable:true,
            value: function () {
                return {image:""};
            }
        },
        onsave: {
            type: Object,
            value: function () {
                return function (user) {
                    console.warn("Parameter onsave not set.");
                }
            }
        },
        editable: {
            type: Boolean,
            value: false
        }
    }

});