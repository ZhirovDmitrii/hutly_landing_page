"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchComments() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://hutly-landing-page-back.onrender.com/api/comments';
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const comments = yield response.json();
            console.log('Fetched comments:', comments);
            comments.forEach((comment) => {
                postComment(comment);
            });
        }
        catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    });
}
function postComment(comment) {
    const fN = comment.firstName || 'Anonymous';
    const lN = comment.lastName || 'Anonymous';
    const rate = comment.rate || 0;
    const text = comment.text || 'No content';
    console.log(fN, lN, rate, text);
    const postContainer = document.querySelector('.testimonials-container');
    if (!postContainer) {
        console.error('Container not found');
        return;
    }
    const postElement = document.createElement('div');
    postElement.className = 'comment';
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
    rateElement.textContent = `rate: ${rate}`;
    postElement.appendChild(fN_Element);
    postElement.appendChild(lN_Element);
    postElement.appendChild(textElement);
    postElement.appendChild(rateElement);
    postContainer.appendChild(postElement);
}
fetchComments();
