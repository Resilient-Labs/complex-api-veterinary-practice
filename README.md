# 🐶 &nbsp;Dog Breed Lookup

A dog breed lookup app for a veterinary practice. You type in a breed, and it shows a random picture of that breed along with its height and weight ranges for males and females and its life expectancy. It uses two APIs: Dog CEO for the pictures and API Ninjas for the breed info.

**Live Demo:** https://vet-api-project.netlify.app

[![Screenshot-2026-09-30-at-3-00-15-AM.png](https://i.postimg.cc/YjcJP3yD/Screenshot-2026-09-30-at-3-00-15-AM.png)](https://postimg.cc/4H5L7zGp)

## How It's Made:

**Tech used:**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

When you search for a breed, I first call the Dog CEO API, which sends back a link to a random picture of that breed. I put that picture on the page.

The tricky part was getting the breed name for the second API. Dog CEO doesn't send the breed name by itself, but the picture link has it inside, like `.../breeds/retriever-golden/...`. So I split the link at every `/` to pull out `retriever-golden`, then split that at the `-`, flipped the order, and joined it back with a space to get `golden retriever`.

I then send that name to the API Ninjas dogs endpoint with my API key in the headers. It sends back the breed's height, weight, and life expectancy, and I put each one on the page.

## Optimizations

Things I want to improve:

- Show a message on the page when a breed isn't found, instead of only logging the error in the console.
- Add a `.catch()` to the first fetch too, so errors from the Dog CEO API get handled.
- Move my API key out of the front-end code so it isn't public.
- Let the user press Enter to search, not just click the button.

## Lessons Learned:

This was the first time I used a value hidden inside another API's data to make a second API call. I learned how useful `split()`, `reverse()`, and `join()` are for turning one string into the format another API needs. I also learned how to send an API key in the headers of a fetch request, since API Ninjas doesn't take the key in the URL like other APIs I've used.
