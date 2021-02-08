function modal(options) {
    return new Promise(async function (resolve) {

        const popup = document.getElementById(options.popupId);
        if (options.title){
            const title = popup.querySelector("[id*='title']");
            title.innerText = options.title;
        }

        openPopup(`#${options.popupId}`);

        const confirmButton = document.querySelector('#confirm');
        confirmButton.addEventListener('click', function () {
            resolve("confirm");
            closePopup();
        }, once);

        // check if they want a cancel button
        if (options.cancel) {
            const cancelButton = document.getElementById('cancel');
            cancelButton.addEventListener('click', function () {
                resolve("cancel");
                closePopup();
            }, once);

        }
        const form = popup.querySelector('form');
        // listen for the submit event on the inputs
        if (form && options.data) {
            let inputs = form.elements;
            inputs = [...inputs].filter(input => input.nodeName === "INPUT" && !['submit', 'radio', 'checkbox'].includes(input.type));
            // Iterate over the form controls
            for (let i = 0; i < inputs.length; i++) {
                // Update input
                inputs[i].value = `${options.data[inputs[i].name]}`

            }
        }
        if (form) {
            form.onsubmit = function (e) {
                e.preventDefault();
                let rawData = new FormData(form);
                const json = Object.assign(...Array.from(rawData.entries(), ([x, y]) => ({[x]: y})));
                let data = {};
                for (let pair of rawData.entries()) {
                    data[pair[0]] = pair[1];
                }
                let jsonData = JSON.stringify(data);
                resolve(data);
                closePopup();
            };
        }

    });
}


openPopup = function (popupId, popupExtraConfig, isModal) {

    $(popupId).removeAttr('style');
    if (!$(popupId).hasClass('zoom-anim-dialog')) {
        $(popupId).addClass('zoom-anim-dialog');
    }
    $(popupId).draggable({
        handle: $(popupId).children().first(),
        disabled: false
    });
    $(popupId).children().first().css('cursor', 'move');

    let popupConfig = {
        removalDelay: 70,
        items: {
            src: popupId
        },
        mainClass: 'my-mfp-slide-bottom',
        type: 'inline',
        modal: isModal

    };

    $.extend(popupConfig, popupExtraConfig);
    $.magnificPopup.open(popupConfig);
    $('.mfp-close').addClass('mfp-close-white');

    setTimeout(function () {
            $(popupId).removeClass('zoom-anim-dialog');
        },
        700
    );
}

closePopup = function () {
    $.magnificPopup.close();

}

const once = {
    once: true
};



