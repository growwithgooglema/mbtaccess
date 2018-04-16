var schools = [];
fetch('data/cleaner_universities.json').then(function(response) {
    if (response.ok) {
        return response.json();
    }
    throw Error("Failed to fetch Massachusetts universities data.");
}).then(function(schools) {
    $("#universities").DataTable({
        data: schools.map(function(school) {
            return [
                school.name,
                school.street,
                school.stops,
                school.wheelchairs,
                school.ratio.toFixed(2)
            ];
        }),
        columns: [
            {title: "Name"},
            {title: "Address"},
            {title: "Stops"},
            {title: "Wheelchair Access"},
            {title: "Ratio"}
        ],
        responsive: true,
        columnDefs: [
            {
                responsivePriority: 1,
                targets: 0
            },
            {
                responsivePriority: 3,
                targets: 1
            },
            {
                responsivePriority: 2,
                targets: -2
            }
        ]
    });
}).catch(function(err) {
    console.log(`${err.message} occurred during DB processing.`);
});

// Initialize tooltip component
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
// Initialize popover component
$(function () {
    $('[data-toggle="popover"]').popover();
});
$('a.nav-link').on('click', function() {
    var link = $(this);
    $('a.nav-link.active').removeClass('active');
    $(link).addClass('active');
});
// Calculate current year for footer
var currentYear = new Date().getFullYear();
$("#copyright").html(`&copy; ${currentYear}`);
