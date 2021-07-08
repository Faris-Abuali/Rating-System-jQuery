<?php
date_default_timezone_set("Asia/Jerusalem");


$connect = new PDO("mysql:host=localhost;dbname=ratingsystem","root","");

if(isset($_POST['rating_data'])){


    $data = array(
        ":user_rating"  => $_POST['rating_data'],
        ":user_name"    => $_POST['user_name'],
        ":user_review"  => $_POST['user_review'],
        ":submit_time"  => time()
    );


    $query = "
    INSERT INTO review_table 
	(user_name, user_rating, user_review, submit_time) 
	VALUES (:user_name, :user_rating, :user_review, :submit_time)
	";


    $statement = $connect->prepare($query);

    $statement->execute($data);


    echo "Success! Your Review & Rating Has Been Submitted";
}

// -------------------------------------

// if(isset($_POST['action'])){
  
//     $average_rating = 0;
//     $total_reviews = 0;
//     $all_star_reviews = array(
//         "five_star_review"  => 0,
//         "four_star_review"  => 0,
//         "three_star_review" => 0,
//         "two_star_review"   => 0,
//         "one_star_review"   => 0,
//     );
//     $total_user_rating = 0;
//     $review_content = array();
//     // $review_content is array of arrays. Each element in it will be an array.

//     $query = "SELECT * FROM review_table ORDER BY review_id DESC";

//     $result = $connect->query($query, PDO::FETCH_ASSOC);

//     // $statement2 = $connect->prepare($query2);

//     // $statement2->execute();

//     // $result = $statement2->fetch(PDO::FETCH_ASSOC);


//     foreach($result as $row){

//         // NOTE: $review_content is array of arrays. Each element in it will be an array
//         $review_content[] = array(
//             'user_name'     => $row['user_name'],
//             'user_review'   => $row['user_review'],
//             'rating'        => $row['user_rating'],
//             'submit_time'   => date('l jS, F Y h:i:s A', $row["submit_time"])
//         );

//         if($row['user_rating'] == '5'){
//             $all_star_reviews['five_star_review']++;
//         }
//         else if($row['user_rating'] == '4'){
//             $all_star_reviews['four_star_review']++;
//         }
//         else if($row['user_rating'] == '3'){
//             $all_star_reviews['three_star_review']++;
//         }
//         else if($row['user_rating'] == '2'){
//             $all_star_reviews['two_star_review']++;
//         }
//         else if($row['user_rating'] == '1'){
//             $all_star_reviews['one_star_review']++;
//         }


//         $total_reviews++;
//         $total_user_rating = $total_user_rating + $row['user_rating'];
//     }// end foreach


//     if($total_reviews != 0){
//         $average_rating = $total_user_rating / $total_reviews;

//         // Take only 2 digits on the right of the decimal point
//         $average_rating = number_format($average_rating, 2);
//     }

//     $output = array(
//             'average_rating'    => $average_rating,
//             'total_reviews'      => $total_reviews,
            
//             'five_star_review'	=> $all_star_reviews['five_star_review'],
//             'four_star_review'	=> $all_star_reviews['four_star_review'],
//             'three_star_review'	=> $all_star_reviews['three_star_review'],
//             'two_star_review'	=> $all_star_reviews['two_star_review'],
//             'one_star_review'	=> $all_star_reviews['one_star_review'],

//             'review_data'       => $review_content
//     );

//     echo json_encode($output);
// }

?>
