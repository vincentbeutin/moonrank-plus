document.addEventListener("DOMContentLoaded", function() {

    document.querySelector('#add_row').addEventListener('click', function (e) {
        e.preventDefault();

        let row = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>
                <input name="mapping-marketplace[]" type="text" class="form-control">
            </td>
            <td>
                <input name="mapping-moonrank[]" type="text" class="form-control">
            </td>
            <td>
                <button class="btn btn-outline-danger delete_row">remove</button>
            </td>
        </tr>
        `;

        document.querySelector('#add_table tbody').append(row);
    });

    document.querySelector('body').addEventListener('click', function(e) {
        // Do some check on target
        if ( e.target.classList.contains('delete_row') ) {
            e.preventDefault();
            e.target.closest('tr').remove();
        }
    }, true); // Use Capturing

    document.querySelector('#saveMapping').addEventListener('click', function (e) {
        e.preventDefault();
        save_options();
    });

    // Saves options to chrome.storage
    function save_options() {
        var form = document.querySelector('form#mapping');
        var data = new FormData(form);
        const values = Object.fromEntries(data.entries());

        let mapping = [];

        let marketplaces = data.getAll("mapping-marketplace[]");
        let moonrank = data.getAll("mapping-moonrank[]");

        marketplaces.forEach(function (item, key) {
            mapping.push({
                marketplace: item,
                moonrank: moonrank[key],
            })
        });

        // var color = document.getElementById('color').value;
        // var likesColor = document.getElementById('like').checked;
        chrome.storage.sync.set({
            mapping: mapping,
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }

    function restore_options() {
        //default
        chrome.storage.sync.get({
            mapping: [
                {
                    marketplace: 'the_infamous_thugbirdz_derivative',
                    moonrank: 'infamousthug',
                },
                {
                    marketplace: 'angry_bunny_club',
                    moonrank: 'angrybunnyclub',
                },
                {
                    marketplace: 'degenerate_ape_academy',
                    moonrank: 'degenapes',
                },
                {
                    marketplace: 'skyline_nft',
                    moonrank: 'skyline',
                },
                {
                    marketplace: 'unirexcity',
                    moonrank: 'unirex',
                },
                {
                    marketplace: 'lotus_gang_nft',
                    moonrank: 'lotusgang',
                },
                {
                    marketplace: 'solana_monkette_busines',
                    moonrank: 'solanamonkettebusiness',
                },
                {
                    marketplace: 'goblin_laboratory',
                    moonrank: 'goblinbrain',
                },
            ]
        }, function(options) {
            createTable(options.mapping)
        });
    }

    function createTable(mapping) {
        mapping.forEach(function (item, key) {

            let row = document.createElement('tr');
            row.innerHTML = `
                <tr>
                    <td>
                        <input name="mapping-marketplace[]" type="text" class="form-control" value="${item.marketplace}">
                    </td>
                    <td>
                        <input name="mapping-moonrank[]" type="text" class="form-control" value="${item.moonrank}">
                    </td>
                    <td>
                        <button class="btn btn-outline-danger delete_row">remove</button>
                    </td>
                </tr>
            `;

            document.querySelector('#add_table tbody').append(row);
        });
    }

    function serializeForm(form) {
        var obj = {};
        var formData = new FormData(form);
        for (var key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    };

    restore_options();
});