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
    rateElement.textContent = String(rate);

    postElement.appendChild(textElement);
    postElement.appendChild(fN_Element);
    postElement.appendChild(lN_Element);
    postElement.appendChild(rateElement);

    post.appendChild(postElement);
}

fetchComments();