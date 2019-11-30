export default {
    methods: {
        getPopoverHtml: function(drops) {
            if (!drops) {
                return '';
            }

            let html = '<table class="table table-dark table-striped table-sm drop-table">',
                seen = {};
            for (let [ location, type, rotation, rarity, chance ] of drops) {
                if (seen[location] !== undefined) { 
                    continue;
                }
                seen[location] = true;

                //console.log(location, '|', type, '|', rotation, '|', rarity, '|', chance);

                let extraLocation = '',
                    vaulted = false;

                if (type === 'Baro') {
                    rarity += '<img src="/static/img/ducats.png">';
                }
                else if (type === 'Cetus Bounty Rewards') {
                    location = location.replace(/^Level (\d+) - (\d+) (Bounty|Ghoul Bounty)$/, 'Cetus $3 $1-$2');
                }
                else if (type === 'Mission Rewards' && rotation !== null && rotation.length === 1) {
                    extraLocation = ' [' + rotation + ']';
                }
                else if (type === 'Relics') {
                    vaulted = FramethingData.vaulted_relics.indexOf(location) >= 0;
                    extraLocation = vaulted ? ' [V]' : '';
                    location += ' Relic';
                }

                html += `
<tr class="${vaulted ? 'drop-vaulted' : 'drop-active'}">
    <td>${location}${extraLocation}</td>
    <td>${rarity || ''}</td>
    <td>${chance}%</td>
</tr>
`;
            }
            html += '</table>';
            return html;
        },
    },
}
