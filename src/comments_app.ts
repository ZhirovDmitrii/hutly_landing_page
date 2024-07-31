async function fetchComments() {
    const url = 'https://hutly-landing-page-back.onrender.com/api/comments';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const comments = await response.json();
        console.log('Fetched comments:', comments);

        comments.forEach((comment: { firstName: any; lastName: any; rate: any; text: any; }) => {
            postComment(comment);
        });

    } catch (error) {
        console.error('Failed to fetch comments:', error);
    }
}

function postComment(comment: { firstName: string; lastName: string; rate: number; text: string; }) {
    const fN = comment.firstName || 'Anonymous';
    const lN = comment.lastName || 'Anonymous';
    const rate = comment.rate || 0;
    const text = comment.text || 'No content';
    // ______________________________________________________________________
    const img = document.createElement('img');
    img.src = "src/img/Star.svg";
    img.alt = 'no file';



    console.log(fN, lN, rate, text);

    const post = document.querySelector('.testimonials-container');
    if (!post) {
        console.error('Container not found');
        return;
    }

    const postElement = document.createElement('div');
    postElement.className = 'testimonial';

    const fN_Element = document.createElement('div');
    fN_Element.className = 'comment-fN';
    fN_Element.textContent = fN;

    const lN_Element = document.createElement('div');
    lN_Element.className = 'comment-lN';
    lN_Element.textContent = lN;

    const textElement = document.createElement('div');
    textElement.className = 'comment-text';
    textElement.textContent = text;

    const rateElement = document.createElement('div');
    rateElement.className = 'comment-rate';
    // rateElement.textContent = String(rate);
    rateElement.contains(addStars(rate, img));

    postElement.appendChild(textElement);
    postElement.appendChild(fN_Element);
    postElement.appendChild(lN_Element);
    postElement.appendChild(rateElement);


    function addStars(rate, img){
        const allStars = document.createElement('div');
        allStars.className = 'stars'
        for (let i= 0; i < rate; i++){
            allStars.appendChild(img);
        }
        return allStars;
    }

    post.appendChild(postElement);
}

fetchComments();