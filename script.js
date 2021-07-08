$(function () {

    var rating_data = 0; //The rating must be 1,2,3,4, or 5. So min is 1 and max is 5

    $('#add_review').on('click', function () {

        $('#review_modal').modal('show');
    });


    $(document).on('mouseenter', '.submit_star', function () {

        reset_background();

        // $(this) refers to the star on which the mouse is currently on
        var rating = $(this).data('rating');

        for (var count = 1; count <= rating; count += 1) {
            $('#submit_star_' + count).addClass('text-warning');
        }
    });


    function reset_background() {

        for (var count = 1; count <= 5; count += 1) {
            $('#submit_star_' + count).removeClass('text-warning').addClass('star-light');
        }
    }

    $(document).on('mouseleave', '.submit_star', function () {
        reset_background();

        for (var count = 1; count <= rating_data; count++) {
            $('#submit_star_' + count).removeClass('star-light').addClass('text-warning');
        }
    });


    $(document).on('click', '.submit_star', function () {

        // $(this) refers to the star on which the mouse is currently on
        rating_data = $(this).data('rating');
    });


    $('#save_review').on('click', function () {

        var user_name = $('#user_name').val();
        var user_review = $('#user_review').val();

        if (user_name == '' || user_review == '') {
            alert("Please Fill in All Fields");
        }
        else if(rating_data == 0){
            //The rating must be 1,2,3,4, or 5. So min is 1 and max is 5.
            // So if rating_data is still = 0, this means the user has not CLICKED on stars.
            alert("Please Specify The Number of Stars Based on Your Opinion");
        }
        else {
            $.ajax({
                url: 'submit_rating.php',
                method: 'POST',
                data: {
                    rating_data: rating_data,
                    user_name: user_name,
                    user_review: user_review
                },
                success: function (data) {
                    // Hide the Modal From the Webpage
                    $('#review_modal').modal('hide');
                    // alert(data);


                    // Now, clear the modal's input fields 
                    $('input[name="user_name"]').val("");
                    $('input[name="user_review"]').val("");

                    reset_background(); //Clear the stars (Make them all gray)

                    // Now after adding the review to DB, you can invoke this function that makes ajax request to load data, so you can see the new added review without the need to refresh page.
                    load_rating_data();
                }

            });
        }

    });
    // ===========================================

    load_rating_data();

    function load_rating_data() {

        $.ajax({
            url: "load_data.php",
            method: "POST",
            data: { action: 'load_data' },
            dataType: "JSON",
            success: function (data) {
                // Now the response is returned as a JSON object

                console.log(data);
                $('#average_rating').text(data.average_rating);
                $('#total_review').text(data.total_reviews);

                var count_star = 0;

                $('.main_star').each(function () {

                    count_star++;
                    if (Math.round(data.average_rating) >= count_star) {
                        $(this).addClass('text-warning').removeClass('star-light');
                    }
                });

                $('#total_five_star_review').text(data.all_star_reviews.five_star_review);

                $('#total_four_star_review').text(data.all_star_reviews.four_star_review);

                $('#total_three_star_review').text(data.all_star_reviews.three_star_review);

                $('#total_two_star_review').text(data.all_star_reviews.two_star_review);

                $('#total_one_star_review').text(data.all_star_reviews.one_star_review);


                $('#five_star_progress').css({
                    width:
                        (data.all_star_reviews.five_star_review / data.total_reviews) * 100 + '%'
                });

                $('#four_star_progress').css({
                    width:
                        (data.all_star_reviews.four_star_review / data.total_reviews) * 100 + '%'
                });

                $('#three_star_progress').css({
                    width:
                        (data.all_star_reviews.three_star_review / data.total_reviews) * 100 + '%'
                });

                $('#two_star_progress').css({
                    width:
                        (data.all_star_reviews.two_star_review / data.total_reviews) * 100 + '%'
                });

                $('#one_star_progress').css({
                    width:
                        (data.all_star_reviews.one_star_review / data.total_reviews) * 100 + '%'
                });

                // =============================================
                if (data.review_data.length > 0) {

                    var html = '';

                    for (var count = 0; count < data.review_data.length; count += 1) {

                        html += '<div class="row mb-3">';

                        html += '<div class="col-sm-1"><div class="rounded-circle bg-danger text-white pt-2 pb-2"><h3 class="text-center">' + data.review_data[count].user_name.charAt(0) + '</h3></div></div>';

                        html += '<div class="col-sm-11">';

                         html += '<div class="card">';

                         html += '<div class="card-header"><strong>' + data.review_data[count].user_name + '</strong></div>';

                         html += '<div class="card-body">';

                        for (var star = 1; star <= 5; star += 1) {

                            var class_name = '';

                            if (data.review_data[count].rating >= star) {
                                class_name = 'text-warning';
                            }
                            else {
                                class_name = 'star-light';
                            }

                            html += '<i class="fas fa-star ' + class_name + ' mr-1"></i>';
                        }// end for loop

                        html += '<br />';

                        html += data.review_data[count].user_review;

                        html += '</div>'; //end card-body

                        html += '<div class="card-footer text-right">On ' + data.review_data[count].submit_time + '</div>';

                         html += '</div>'; //end card

                        html += '</div>';  // end col-sm-11

                        html += '</div>'; // end row
                    }// end outer for loop

                    $('#review_content').html(html);
                }

            }// end success function
        })
    } //end function load_rating_data()

});