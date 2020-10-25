
import "./import/modules";
import "./import/components";

import Flatpickr from "flatpickr";
import {Russian} from "flatpickr/dist/l10n/ru.js";
import Inputmask from "inputmask";
import Hammer from "hammerjs";


// Полифилы
//====================//
window.performance = window.performance || {};
window.performance.now = window.performance.now || (function () {
    window.performance.offset = +new Date();
    return function () {
        return +new Date() - window.performance.offset;
    };
})();
window.requestAnimate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
    || function (/* Function */ callback, /* DOMElement */ element) {
        let time = performance.now();
        let delay = Math.max(0, 16 - time - window.lastTimeAnimate || 0);
        return window.setTimeout(callback.bind(undefined, window.lastTimeAnimate = time + delay), delay);
    };

window.cancelAnimate = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame
    || function cancelAnimate(/* number */ id) {
        return window.clearTimeout(id);
    };
//====================//


// Слайдер
//====================//
window.Slider = class Slider {
    constructor(element) {
        element.Slider = this;
        this.element = element;

        this.index = this.element.firstElementChild.querySelector("._active") || this.element.firstElementChild.firstElementChild;

        this.pos = {
            current: 0,
            progress: 0
        };
        this.animation = {
            entity: null,
            from: 0,
            to: 0
        };

        this.max = [Math.min(this.element.offsetWidth - this.element.firstElementChild.offsetWidth, 0), 0];

        this.Hammer = new Hammer.Manager(this.element);
        this.Hammer.add(new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL, threshold: 2}));

        Hammer.on(this.element, "touchstart mousedown pointerdown", (function (ev) {
            this.animation.entity && this.animation.entity.stop();
        }).bind(this));
        Hammer.on(this.element, "click", (function (ev) {
            this.isPan && ev.preventDefault();
        }).bind(this), false);


        this.Hammer.on("panleft panright panend panstart", (function (ev) {

            if (ev.eventType === Hammer.INPUT_CANCEL) {
                return;
            }

            this.isPan = true;

            this.pos.progress = Math.min(Math.max(this.pos.current + ev.deltaX, this.max[0]), this.max[1]);

            if (this.pos.progress <= this.max[0] || this.pos.progress >= this.max[1]) {
                this.pos.progress += 20 * (ev.deltaX / this.element.offsetWidth);
            }

            this.element.firstElementChild.style.transform = "translate3d(" + this.pos.progress + "px, 0, 0)";

            if (ev.type === "panend") {
                this.animate(
                    this.pos.progress,
                    Math.min(Math.max(this.pos.current + (ev.deltaX * Math.max(Math.abs(ev.overallVelocityX * 1.1), 1.1) * Math.max(Math.abs(ev.velocityX * 1.1), 1.1)), this.max[0]), this.max[1])
                );
                setTimeout((function () {
                    this.isPan = false;
                }).bind(this), 10);
            }
        }).bind(this));

        this.goTo(this.index);
    }

    goTo(i) {
        this.animation.entity && this.animation.entity.stop();
        this.index && this.index.classList.remove("_active");

        this.index = this.element.firstElementChild.children[i] || i;

        if (this.index instanceof Element && this.index.parentElement === this.element.firstElementChild) {
            this.animate(
                this.pos.current,
                Math.min(Math.max(-this.index.offsetLeft + ((this.element.offsetWidth - this.index.offsetWidth) / 2), this.max[0]), this.max[1])
            );
            this.index.classList.add("_active");
        }
    };

    animate(from, to) {
        this.animation.entity && this.animation.entity.stop();
        this.animation.from = from;
        this.animation.to = to;

        this.animation.entity = new Animate({
            duration: 600,
            timing: (function (timeFraction) {
                if (this.animation.to <= this.max[0] && this.animation.from >= this.max[0] || this.animation.to >= this.max[1] && this.animation.from <= this.max[1]) {
                    return 1 + 2 * Math.pow(timeFraction - 1, 3) + Math.pow(timeFraction - 1, 2);
                }
                return Math.sqrt(1 - Math.pow(timeFraction - 1, 2));
            }).bind(this),
            callback: (function (progress) {
                this.pos.current = this.animation.from + (this.animation.to - this.animation.from) * (progress || 0);
                this.element.firstElementChild.style.transform = "translate3d(" + this.pos.current + "px, 0, 0)";
            }).bind(this)
        });
    }

    onResize(event) {
        this.resizeTimer && clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout((function () {
            this.max = [Math.min(this.element.offsetWidth - this.element.firstElementChild.offsetWidth, 0), 0];
            this.goTo(this.index);
        }).bind(this), 150);
    }
};
//====================//



// Анимации
//====================//
window.Animate = class Animate {
    constructor({timing, callback, duration}) {
        this.animateId = null;
        this.startTime = performance.now();
        this.stopTime = null;
        this.timing = timing || function (t) {
            return t;
        };
        this.callback = callback;
        this.duration = duration || 300;
        this.start();
    }

    animate(time) {
        let timeFraction = (time - this.startTime) / this.duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = this.timing(timeFraction);

        this.callback(progress);

        if (timeFraction < 1) {
            this.animateId = requestAnimate(this.animate.bind(this));
        } else {
            this.animateId = null;
        }
    }

    start() {
        this.stopTime && (this.startTime += performance.now() - this.stopTime);
        !this.animateId && (this.animateId = requestAnimate(this.animate.bind(this)));
    }

    stop() {
        this.animateId && cancelAnimate(this.animateId);
        this.stopTime = performance.now();
        this.animateId = null;
    }
};
//====================//



// Маски для полей ввода
//====================//
Inputmask.extendAliases({
    "name": {
        mask: "a{2,+}[ ][-]a{*}",
        jitMasking: true,
        autoUnmask: true,
        oncomplete(event) {
            this.classList.remove("_error", "_empty");
        },
        onincomplete(event) {
            this.classList.add("_error") || this.value || this.classList.add("_empty");
        }
    },
    "nominal": {
        alias: "numeric",
        greedy: true,
        rightAlign: false,
        groupSeparator: " ",
        unmaskAsNumber: false,
        min: 1000,
        max: 50000,
        SetMaxOnOverflow: true,
        oncomplete: function () {
            let preset = this.parentElement.nextElementSibling.querySelector(`.cert__preset[data-value="${this.inputmask.unmaskedvalue()}"]`);
            preset || this.parentElement.nextElementSibling.Slider && this.parentElement.nextElementSibling.Slider.index && this.parentElement.nextElementSibling.Slider.index.classList.remove('_active');
            this.parentElement.nextElementSibling.Slider && this.parentElement.nextElementSibling.Slider.goTo(preset);
        },
    },
    "email": {
        required: true,
        inputmode: "email",
        oncomplete(event) {
            this.classList.remove("_error", "_empty");
        },
        onincomplete(event) {
            this.classList.add("_error") || this.value || this.classList.add("_empty");
        }
    },
    "tel": {
        mask: "+7 (999) 999-99-99",
        inputmode: "tel",
        onUnMask(mValue, uValue) {
            return "+7" + uValue;
        },
        onBeforePaste(pastedValue, opts) {
            return pastedValue = pastedValue.replace(/^(\+7)|(7)|(8)/, ""), "+" + pastedValue;
        },
        oncomplete(event) {
            this.classList.remove("_error", "_empty");
        },
        onincomplete(event) {
            this.classList.add("_error") || this.value || this.classList.add("_empty");
        }
    },
});

Inputmask.extendDefaults({
    showMaskOnHover: false,
    removeMaskOnSubmit: true,
});



window.Certificate = class Certificate {
    constructor(el, {}) {
        if (el instanceof HTMLFormElement) {
            this.form = el;
        } else {
            this.form = document.querySelector(String(el));
        }
        this.form.Certificate = this;
        this.form.noValidate = true;
        this.form.onsubmit = this.submit.bind(this);
        this.form.addEventListener("change", this.refreshCheckout.bind(this));

        this.config = {
            newItemOnStart: true,
            maxItems: 0,
            itemType: {
                param: "ITEMS[#INDEX#][TYPE]",
                required: true,
                startIndex: 0,
                types: [
                    {
                        name: "Сертификат 1",
                        value: "1",
                        img: "/img/Сертификат 1.png",
                        class: "",
                    },
                    {
                        name: "Сертификат 2",
                        value: "2",
                        img: "/img/Сертификат 2.png",
                        class: "",
                    },
                    {
                        name: "Сертификат 3",
                        value: "3",
                        img: "/img/Сертификат 3.png",
                        class: "",
                    },
                    {
                        name: "Сертификат 4",
                        value: "4",
                        img: "/img/Сертификат 4.png",
                        class: "",
                    },
                    {
                        name: "Сертификат 5",
                        value: "5",
                        img: "/img/Сертификат 5.png",
                        class: "",
                    },
                ],
            },
            itemNominal: {
                param: "ITEMS[#INDEX#][NOMINAL]",
                required: true,
                value: 1000,
                min: 1000,
                max: 50000,
                class: "_nominal",
                presets: [
                    {
                        name: "1 000",
                        value: 1000,
                        class: "",
                    },
                    {
                        name: "2 000",
                        value: 2000,
                        class: "",
                    },
                    {
                        name: "3 000",
                        value: 3000,
                        class: "",
                    },
                    {
                        name: "5 000",
                        value: 5000,
                        class: "",
                    },
                    {
                        name: "10 000",
                        value: 10000,
                        class: "",
                    },
                    {
                        name: "20 000",
                        value: 20000,
                        class: "",
                    },
                    {
                        name: "50 000",
                        value: 50000,
                        class: "",
                    },
                ]
            },
            recipient: [
                {
                    type: "text",
                    param: "ITEMS[#INDEX#][NAME]",
                    placeholder: "Имя",
                    title: "Имя",
                    class: "_name",
                    regexp: '^\\s?[A-Za-zА-Яа-яЁё]+\\s?-?[A-Za-zА-Яа-яЁё]+\\s?',
                    required: true,
                },
                {
                    type: "text",
                    param: "ITEMS[#INDEX#][PHONE]",
                    placeholder: "+7 (000) 000-00-00",
                    title: "Телефон",
                    class: "_tel",
                    required: true,
                    mask: "tel",
                },
                {
                    type: "text",
                    param: "ITEMS[#INDEX#][EMAIL]",
                    placeholder: "Email",
                    title: "Email",
                    class: "_email",
                    required: true,
                    mask: "email",
                },
                {
                    type: "text",
                    param: "ITEMS[#INDEX#][TEXT]",
                    placeholder: "Текст поздравления",
                    class: "_text",
                },
            ],
            datetime: {
                type: "datetime",
                param: "ITEMS[#INDEX#][DATE]",
                class: "_datetime",
                min: "today",
                max: "2022-10-25",
                toggle: {
                    type: "checkbox",
                    class: "",
                    param: "ITEMS[#INDEX#][USE_DATE]",
                    value: "Y",
                    label: "Отложенная отправка",
                    checked: false,
                },
                timezone: {
                    param: "ITEMS[#INDEX#][DATE_TIMEZONE]",
                }
            },
            sender: [
                {
                    type: "text",
                    param: "SENDER_NAME",
                    placeholder: "Имя",
                    class: "_name",
                    required: true,
                    regexp: '^\\s?[A-Za-zА-Яа-яЁё]+\\s?-?[A-Za-zА-Яа-яЁё]+\\s?',
                },
                {
                    type: "text",
                    param: "SENDER_PHONE",
                    placeholder: "+7 (000) 000-00-00",
                    class: "_tel",
                    required: true,
                    mask: "tel",
                },
                {
                    type: "text",
                    param: "SENDER_EMAIL",
                    placeholder: "Email",
                    class: "_email",
                    required: true,
                    mask: "email",
                },
                {
                    type: "checkbox",
                    param: "SENDER_ANON",
                    label: "Отправить анонимно",
                    value: "Y",
                    class: "cert__switch",
                }
            ],
            policy: {
                text: "Нажимая на кнопку «Оформить», вы соглашаетесь с условиями #LINK#",
                link: {
                    target: "_blank",
                    text: "Политики конфиденциальности",
                    url: "https://visagehall.ru/about/policy/",
                }
            }
        };

        this.init();

    }

    init() {
        this.items = [];
        this.isValid = false;

        this.createItem();

        this.add =  this.form.appendChild(document.createElement('div'));
        this.add.className = "cert__add";

        let addBtn = this.add.appendChild(document.createElement('div'));
        addBtn.className = "cert__btn _add";
        addBtn.innerText = "Добавить сертификат";
        addBtn.addEventListener("click", this.createItem.bind(this));

        let sender = this.form.appendChild(document.createElement('div'));
        sender.className = "cert__sender";

        let senderHeadline = sender.appendChild(document.createElement('h4'));
        senderHeadline.innerText = "Ваши данные";

        for (let i = 0; i < this.config.sender.length; i++) {
            let v = this.config.sender[i];
            let field = sender.appendChild(document.createElement("div"));
            field.className = "cert__field";
            if (v.type == "checkbox") {
                field.innerText = v.label;
                field.classList.add("_switch");

                let label = field.appendChild(document.createElement("label"));
                label.className = "cert__switch";
                v.class && label.classList.add(v.class);

                let checkbox = label.appendChild(document.createElement("input"));
                checkbox.type = "checkbox";
                checkbox.value = v.value;
                checkbox.checked = !!v.checked;
                checkbox.required = !!v.required;
                checkbox.name = v.param;
                checkbox.addEventListener("change", function () {
                    (this.checked || label.classList.remove('_active')) && label.classList.add('_active');
                });

            } else {
                let input = field.appendChild(document.createElement("input"));
                input.type = "text";
                input.required = !!v.required;
                input.className = "cert__input";
                v.value && (input.value = v.value);
                v.class && input.classList.add(v.class);
                v.placeholder && (input.placeholder = v.placeholder);
                input.name = v.param;

                v.mask && Inputmask(v.mask).mask(input);

                v.regexp && (input.pattern = v.regexp);
            }
        }

        this.checkout = this.form.appendChild(document.createElement('div'));
        this.checkout.className = "cert__checkout";
        let checkoutBtn = this.checkout.appendChild(document.createElement('button'));
        checkoutBtn.className = "cert__btn _checkout";

        if (this.config.policy) {
            let policy = this.checkout.appendChild(document.createElement('p'));
            policy.className = "cert__policy";
            let policyLink = document.createElement('a');
            policyLink.innerText = String(this.config.policy.link.text);
            policyLink.href = String(this.config.policy.link.url);
            policyLink.target = String(this.config.policy.link.target);
            policy.innerHTML = String(this.config.policy.text).replace("#LINK#", policyLink.outerHTML);
        }


        this.refreshCheckout();

    }

    createItem() {
        let fieldset = document.createElement("fieldset");
        fieldset.className = "cert__fieldset";
        (this.items.length > 0 || fieldset.classList.add("_new")) && fieldset.classList.add("_edit");
        let item = fieldset.appendChild(document.createElement("div"));
        item.className = "cert__item";

        (this.form.firstElementChild || !this.form.appendChild(fieldset)) && this.form.insertBefore(fieldset, this.add);

        let design = item.appendChild(document.createElement("div"));
        design.className = "cert__design";

        let designHeadline = design.appendChild(document.createElement("h4"));
        designHeadline.innerText = "Выберите дизайн";

        let types = design.appendChild(document.createElement("div"));
        types.className = "cert__types slider";

        let typesWrap = types.appendChild(document.createElement("div"));
        typesWrap.className = "slider__wrap";

        for (let i = 0; i < this.config.itemType.types.length; i++) {
            let v = this.config.itemType.types[i];
            let label = typesWrap.appendChild(document.createElement("label"));
            label.className = "cert__type";
            v.class && label.classList.add(v.class);
            label.title = v.name;

            let radio = label.appendChild(document.createElement("input"));
            radio.type = "radio";
            radio.name = this.config.itemType.param.replace("#INDEX#", this.items.length);
            radio.required = this.config.itemType.required;
            radio.value = v.value;
            radio.addEventListener("change", function () {
                this.checked && types.Slider && types.Slider.goTo(label);
            });

            let img = label.appendChild(document.createElement("img"));
            img.className = "cert__img";
            img.src = v.img;
            img.alt = v.name;

            if (i == this.config.itemType.startIndex) {
                label.classList.add("_active");
                radio.checked = true;
            }
        }

        new Slider(types);


        let info = item.appendChild(document.createElement("div"));
        info.className = "cert__info";


        let nominal = info.appendChild(document.createElement("div"));
        nominal.className = "cert__nominal";

        let nominalHeadline = nominal.appendChild(document.createElement("h4"));
        nominalHeadline.innerText = "Номинал";

        let nominalField = nominal.appendChild(document.createElement("div"));
        nominalField.className = "cert__field";
        this.config.itemNominal.class && nominalField.classList.add(this.config.itemNominal.class);

        let nominalInput = nominalField.appendChild(document.createElement("input"));
        nominalInput.className = "cert__input";
        nominalInput.type = "text";
        nominalInput.name = this.config.itemNominal.param.replace("#INDEX#", this.items.length);
        nominalInput.required = this.config.itemNominal.required;
        nominalInput.value = this.config.itemNominal.value || this.config.itemNominal.min || 0;
        Inputmask("nominal").mask(nominalInput);
        nominalInput.addEventListener("change", function (e) {
            nominalField.dataset.value = nominalInput.value;
        });

        nominalField.dataset.value = nominalInput.value;

        let presets = nominal.appendChild(document.createElement("div"));
        presets.className = "cert__presets slider";

        let presetsWrap = presets.appendChild(document.createElement("div"));
        presetsWrap.className = "slider__wrap";

        for (let i = 0; i < this.config.itemNominal.presets.length; i++) {
            let v = this.config.itemNominal.presets[i];
            let preset = presetsWrap.appendChild(document.createElement("div"));
            preset.className = "cert__preset";
            v.class && preset.classList.add(v.class);
            preset.dataset.value = v.value;
            preset.innerText = v.name;
            preset.addEventListener("click", function () {
                if (!fieldset.disabled) {
                    nominalInput.value = preset.dataset.value;
                    nominalField.dataset.value = nominalInput.value;
                    presets.Slider && presets.Slider.goTo(preset);
                    this.refreshCheckout();
                }
            }.bind(this));

            if (nominalInput.value == preset.dataset.value) {
                preset.classList.add("_active");
            }
        }

        new Slider(presets);

        let recipient = info.appendChild(document.createElement("div"));
        recipient.className = "cert__recipient";

        let recipientHeadline = recipient.appendChild(document.createElement("h4"));
        recipientHeadline.innerText = "Данные получателя";

        for (let i = 0; i < this.config.recipient.length; i++) {
            let v = this.config.recipient[i];
            let field = recipient.appendChild(document.createElement("div"));
            field.className = "cert__field";
            v.title && (field.title = v.title);

            let input;
            if (v.type == "textarea") {
                input = field.appendChild(document.createElement("textarea"));
                input.spellcheck = false;
                input.rows = 1;
            } else {
                input = field.appendChild(document.createElement("input"));
                input.type = "text";
            }
            input.required = !!v.required;
            input.className = "cert__input";
            v.value && (input.value = v.value);
            v.class && input.classList.add(v.class);
            v.placeholder && (input.placeholder = v.placeholder);
            input.name = v.param.replace("#INDEX#", this.items.length);

            v.mask && Inputmask(v.mask).mask(input);

            v.regexp && (input.pattern = v.regexp);
        }

        let datetime = info.appendChild(document.createElement("div"));
        datetime.className = "cert__datetime";

        let datetimeFieldCheckbox = datetime.appendChild(document.createElement("div"));
        datetimeFieldCheckbox.className = "cert__field _switch";
        datetimeFieldCheckbox.innerText = this.config.datetime.toggle.label;
        this.config.datetime.toggle.class && datetimeFieldCheckbox.classList.add(this.config.datetime.toggle.class);

        let datetimeLabel = datetimeFieldCheckbox.appendChild(document.createElement("label"));
        datetimeLabel.className = "cert__switch";

        let datetimeCheckbox = datetimeLabel.appendChild(document.createElement("input"));
        datetimeCheckbox.type = "checkbox";
        datetimeCheckbox.value = this.config.datetime.toggle.value;
        datetimeCheckbox.checked = !!this.config.datetime.toggle.checked;
        datetimeCheckbox.required = !!this.config.datetime.toggle.required;
        datetimeCheckbox.name = this.config.datetime.toggle.param.replace("#INDEX#", this.items.length);
        datetimeCheckbox.addEventListener("change", function () {
            (this.checked || datetimeLabel.classList.remove('_active')) && datetimeLabel.classList.add('_active');
        });

        let datetimeField = datetime.appendChild(document.createElement("div"));
        datetimeField.className = "cert__field";
        this.config.datetime.toggle.checked || datetimeField.classList.add('_hidden');

        let datetimeInput = datetimeField.appendChild(document.createElement("input"));
        datetimeInput.className = "cert__input";
        datetimeInput.type = "text";
        this.config.datetime.value && (datetimeInput.value = this.config.datetime.value);
        datetimeInput.required = !!this.config.datetime.required;
        datetimeInput.name = this.config.datetime.param.replace("#INDEX#", this.items.length);

        new Flatpickr(datetimeInput, {
            enableTime: true,
            minDate: this.config.datetime.min,
            maxDate: this.config.datetime.max,
            defaultDate: (new Date()),
            dateFormat: "d.m.Y H:i",
            time_24hr: true,
            disableMobile: "true",
            locale: Russian,
            altInput: true,
            altFormat: "j F Y в H:i",
            monthSelectorType: "static",
        });

        let timezoneInput = datetime.appendChild(document.createElement("input"));
        timezoneInput.type = "hidden";
        timezoneInput.name = this.config.datetime.timezone.param.replace("#INDEX#", this.items.length);
        timezoneInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

        datetimeCheckbox.addEventListener("change", function () {
            if (this.checked) {
                datetimeLabel.classList.add('_active');
                datetimeField.classList.remove('_hidden');
            } else {
                datetimeField.classList.add('_hidden');
            }
        });


        let action = info.appendChild(document.createElement("div"));
        action.className = "cert__action";

        let save = action.appendChild(document.createElement("div"));
        save.innerText = "Сохранить";
        save.tabIndex = 0;
        save.className = "cert__btn _save";
        save.addEventListener("click", this.saveItem.bind(this, fieldset));
        save.addEventListener("keyup", function (event) {
            event.code == "Enter" && this.saveItem(fieldset);
        }.bind(this));

        let edit = action.appendChild(document.createElement("div"));
        edit.innerText = "Изменить";
        edit.tabIndex = 0;
        edit.className = "cert__btn _edit";
        edit.addEventListener("click", this.editItem.bind(this, fieldset));
        edit.addEventListener("keyup", function (event) {
            event.code == "Enter" && this.editItem(fieldset);
        }.bind(this));

        let remove = action.appendChild(document.createElement("div"));
        remove.innerText = "Удалить";
        remove.tabIndex = 0;
        remove.className = "cert__btn _remove";
        remove.addEventListener("click", this.removeItem.bind(this, fieldset));
        remove.addEventListener("keyup", function (event) {
            event.code == "Enter" && this.removeItem(fieldset);
        }.bind(this));

        this.items.push(fieldset);
    }

    saveItem(item) {
        if (this.validateItem(item)) {
            item.disabled = true;
            item.classList.add("_save");
            item.classList.remove("_new", "_edit");
        }
        this.refreshCheckout();
    }

    editItem(item) {
        item.disabled = false;
        if (this.items.length > 1) {
            item.classList.add("_edit");
            item.classList.remove("_new", "_save");
        } else {
            item.classList.add("_new");
            item.classList.remove("_edit", "_save");
        }
    }

    removeItem(item) {
        this.form.removeChild(item);
        this.items.splice(this.items.indexOf(item), 1);
        this.refreshCheckout();
    }

    validateItem(item) {
        let isValid = true;

        for (let input of item.querySelectorAll('[name]')) {
            if (!input.validity.valid || input.inputmask && !input.inputmask.isValid()) {
                //isValid && input.reportValidity();
                isValid = false;
                input.classList.add("_error") || input.value || input.classList.add("_empty");
            } else {
                input.classList.remove("_error", "_empty");
            }
        }

        return isValid;
    }

    validate() {
        return this.items.length > 0 && this.validateItem(this.form);
    }

    refreshCheckout(e) {
        let value = 0;
        for (let i of this.form.querySelectorAll('.cert__nominal input')) {
            value += +String(i.value).replace(" ", "");
        }

        let isValid = this.items.length > 0;
        for (let input of this.form.querySelectorAll('[name]')) {
            if (!input.validity.valid || input.inputmask && !input.inputmask.isValid()) {
                isValid = false;
                e instanceof Event && input === e.target && (input.classList.add("_error") || input.value || input.classList.add("_empty"));
            } else {
                e instanceof Event && input === e.target && (input.classList.remove("_error", "_empty"));
            }
        }
        this.checkout.firstElementChild.disabled = !isValid;

        this.checkout.firstElementChild.innerText = (value && "Оформить за " + Inputmask.format(value, {alias: "numeric", groupSeparator: " "}) + " ₽") || "Оформить";
    }

    submit() {
        if (this.validate()) {
            for (let i of this.items) {
                i.disabled = false;
            }

            return true;
        } else {
            return false;
        }
    };

};
