const allPostContainer = document.getElementById('all-post-container');
const categoryPostContainer = document.getElementById('category-post-container');
const markPostContainer = document.getElementById('readed-post-container');
const spinner = document.getElementById('spiner-container');
const noResult = document.getElementById('no-result-section');


const setStatus = document.getElementById('showActive');




/**                         Load all post                  */


const loadPostData = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const data = await response.json();
  const posts = data.posts;
  spinner.classList.remove('hidden');

  setTimeout(displayPosts, 2000, posts)
}



/**                         Load Category post  by Search                */


const loadLatestPostData = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');

  const data = await response.json();

  displayLatestPosts(data);
}


/**                         Display Latest post                 */



const displayLatestPosts = (posts) => {
  console.log(posts)


  posts.forEach(post => {
    console.log(post.cover_image);

    const latestPostContainer = document.getElementById('latest-post-container');
    const latestPost = document.createElement('div');
    latestPost.classList = 'card w-full bg-base-100 shadow-xl p-3 lg:p-5';
    latestPost.innerHTML = `

     <figure><img src="${post?.cover_image}" alt="Shoes" />
          </figure>
          <div class="card-body">
            <p class=" font-inter"><i class="fa-solid fa-calendar-week mr-3"></i>${post?.author?.posted_date || 'No publish date'}</p>
            <h2 class="card-title font-mulish my-4">${post.title}
            </h2>
            <p class="text-lg font-inter font-medium">${post.description}</p>
            <div class="avatar my-5 flex gap-5">
              <div class="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="${post?.profile_image}" />
              </div>
              <div>
                <div class="font-bold font-mulish">
                  ${post?.author?.name}
                </div>
                <div class="font-inter">
                  ${post?.author?.designation || 'Unknown'}
                </div>
              </div>

            </div>
          </div>
    `;

    latestPostContainer.appendChild(latestPost);
  });

}






/**                         Display All post                 */




const displayPosts = (posts) => {
  // console.log(posts);
  allPostContainer.classList.remove('hidden');
  categoryPostContainer.classList.add('hidden');

  posts.forEach(post => {

    const postCard = document.createElement('div');
    postCard.classList = "bg-[#797DFC1A] rounded-3xl mb-10";

    if (post.isActive) {
      postCard.innerHTML = `
     <div class="flex flex-col lg:flex-row p-10 gap-6">
     
     <div class="avatar relative">
                  <div id="status" class="w-4 h-4 bg-green-600 absolute top-[-4px] left-[70px] lg:top-[-4px] lg:right-[-4px]   rounded-full"></div>
                  <div class="w-20 h-20 rounded-xl">
                    <img src="${post.image}" />
                  </div>
                </div>
             
                
               <div class="w-full">
                  <div class="flex justify-start  gap-5 font-medium font-inter">
                    <div class="flex flex-col gap-2 lg:gap-5 lg:flex-row">
                    <div>
                      #${post.category}
                    </div>
                    <div><span>Author :</span>
                      ${post?.author?.name || 'Unknown'}
                    </div>
                    </div>
                  </div>
                  <div class="font-mulish my-3 text-left font-bold text-xl">${post.title}
                  </div>
                  <p class="font-inter">${post.description}</p>
                  <hr class="border-dashed border-[1px] border-gray-400 my-3">
                  <div class="flex mt-3 justify-between items-center">
                    <div class="flex gap-3 lg:gap-8 justify-around">
                      <div>
                        <i class="fa-regular fa-message lg:mr-2"></i> <span>${post.comment_count}</span>
                      </div>
                      <div>
                        <i class="fa-solid fa-eye lg:mr-2"></i><span>${post.view_count}</span>
                      </div>
                      <div>
                        <i class="fa-regular fa-clock lg:mr-2"></i> <span>${post.posted_time} min</span>
                      </div>
                    </div>
                    <div>
                      <button onclick="markAsRead(&#34 ${post.title} &#34, '${post.view_count}')" id="mark-as-read" class="mark-read text-white py-1 px-2 rounded-full bg-green-400"><i
                          class="fa-solid fa-envelope"></i></button>
                    </div>

                  </div>

                </div>
              </div>
    `;


    }
    else {
      postCard.innerHTML = `
     <div class="flex flex-col lg:flex-row p-10 gap-6">
     
     <div class="avatar relative">
                  <div id="status" class="w-4 h-4 bg-red-600 absolute top-[-4px] left-[70px] lg:top-[-4px] lg:right-[-4px]   rounded-full"></div>
                  <div class="w-20 h-20 rounded-xl">
                    <img src="${post.image}" />
                  </div>
                </div>
               
                
               <div class="w-full">
                  <div class="flex justify-start  gap-5 font-medium font-inter">
                    <div class="flex flex-col gap-2 lg:gap-5 lg:flex-row">
                    <div>
                      #${post.category}
                    </div>
                    <div><span>Author :</span>
                      ${post?.author?.name || 'Unknown'}
                    </div>
                    </div>
                  </div>
                  <div class="font-mulish my-3 text-left font-bold text-xl">${post.title}
                  </div>
                  <p class="font-inter">${post.description}</p>
                  <hr class="border-dashed border-[1px] border-gray-400  my-3">
                  <div class="flex mt-3 justify-between items-center">
                    <div class="flex gap-3 lg:gap-8 justify-around">
                      <div>
                        <i class="fa-regular fa-message lg:mr-2"></i> <span>${post.comment_count}</span>
                      </div>
                      <div>
                        <i class="fa-solid fa-eye lg:mr-2"></i><span>${post.view_count}</span>
                      </div>
                      <div>
                        <i class="fa-regular fa-clock lg:mr-2"></i> <span>${post.posted_time} min</span>
                      </div>
                    </div>
                    <div>
                      <button onclick="markAsRead(&#34 ${post.title} &#34, '${post.view_count}')" id="mark-as-read" class="mark-read text-white py-1 px-2 rounded-full bg-green-400"><i
                          class="fa-solid fa-envelope"></i></button>
                    </div>

                  </div>

                </div>
              </div>
    `;
    }

    allPostContainer.appendChild(postCard);


  });

  spinner.classList.add('hidden');
}




/**                         DisplayBySearch                 */




const DisplayBySearch = async (category) => {

  const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);

  const data = await response.json();
  const posts = data.posts
  console.log(posts);
  categoryPostContainer.innerHTML = '';

  noResult.classList.add('hidden');

  if (posts.length === 0) {
    noResult.classList.remove('hidden');
  }

  posts.forEach(post => {
    const categoryPostCard = document.createElement('div');
    categoryPostCard.classList = "bg-[#797DFC1A] rounded-3xl mb-10";


    if (post.isActive) {
      categoryPostCard.innerHTML = `
     <div class="flex flex-col lg:flex-row p-10 gap-6">
     
     <div class="avatar relative">
                  <div id="status" class="w-4 h-4 bg-green-600 absolute top-[-4px] left-[70px] lg:top-[-4px] lg:right-[-4px]   rounded-full"></div>
                  <div class="w-20 h-20 rounded-xl">
                    <img src="${post.image}" />
                  </div>
                </div>
               
                
               <div class="w-full">
                  <div class="flex justify-start gap-5 font-medium font-inter">
                    <div class="flex flex-col gap-2 lg:gap-5 lg:flex-row">
                    <div>
                      #${post.category}
                    </div>
                    <div><span>Author :</span>
                      ${post?.author?.name || 'Unknown'}
                    </div>
                    </div>
                  </div>
                  <div class="font-mulish my-3 text-left font-bold text-xl">${post.title}
                  </div>
                  <p class="font-inter">${post.description}</p>
                 <hr class="border-dashed border-[1px] border-gray-400 my-3">
                  <div class="flex mt-3 justify-between items-center">
                    <div class="flex gap-3 lg:gap-8 justify-around">
                      <div>
                        <i class="fa-regular fa-message lg:mr-2"></i> <span>${post.comment_count}</span>
                      </div>
                      <div>
                        <i class="fa-solid fa-eye lg:mr-2"></i><span>${post.view_count}</span>
                      </div>
                      <div>
                        <i class="fa-regular fa-clock lg:mr-2"></i> <span>${post.posted_time} min</span>
                      </div>
                    </div>
                    <div>
                      <button onclick="markAsRead(&#34 ${post.title} &#34, '${post.view_count}')" id="mark-as-read" class="mark-read text-white py-1 px-2 rounded-full bg-green-400"><i
                          class="fa-solid fa-envelope"></i></button>
                    </div>

                  </div>

                </div>
              </div>
    `;


    }
    else {
      categoryPostCard.innerHTML = `
     <div class="flex flex-col lg:flex-row p-10 gap-6">
     
     <div class="avatar relative">
                  <div id="status" class="w-4 h-4 bg-red-600 absolute top-[-4px] left-[70px] lg:top-[-4px] lg:right-[-4px]   rounded-full"></div>
                  <div class="w-20 h-20 rounded-xl">
                    <img src="${post.image}" />
                  </div>
                </div>
               
                
               <div class="w-full">
                  <div class="flex justify-start  gap-5 font-medium font-inter">
                    <div class="flex flex-col gap-2 lg:gap-5 lg:flex-row">
                    <div>
                      #${post.category}
                    </div>
                    <div><span>Author :</span>
                      ${post?.author?.name || 'Unknown'}
                    </div>
                    </div>
                  </div>
                  <div class="font-mulish my-3 text-left font-bold text-xl">${post.title}
                  </div>
                  <p class="font-inter">${post.description}</p>
                  <hr class="border-dashed border-[2px]  my-3">
                  <div class="flex mt-3 justify-between items-center">
                    <div class="flex gap-3 lg:gap-8 justify-around">
                      <div>
                        <i class="fa-regular fa-message lg:mr-2"></i> <span>${post.comment_count}</span>
                      </div>
                      <div>
                        <i class="fa-solid fa-eye lg:mr-2"></i><span>${post.view_count}</span>
                      </div>
                      <div>
                        <i class="fa-regular fa-clock lg:mr-2"></i> <span>${post.posted_time} min</span>
                      </div>
                    </div>
                    <div>
                      <button onclick="markAsRead(&#34 ${post.title} &#34, '${post.view_count}')" id="mark-as-read" class="mark-read text-white py-1 px-2 rounded-full bg-green-400"><i
                          class="fa-solid fa-envelope"></i></button>
                    </div>

                  </div>

                </div>
              </div>
    `;
    }

    categoryPostContainer.appendChild(categoryPostCard);
  })
  spinner.classList.add('hidden');
}

/**                        Search by category Button Handle                 */



const searchHandle = () => {
  const inputField = document.getElementById('search-field');
  const inputText = inputField.value.toLowerCase();

  if (inputText.length === 0) {
    alert('Please type something for search');
  }

  spinner.classList.remove('hidden');
  allPostContainer.classList.add('hidden');
  categoryPostContainer.classList.remove('hidden');
  noResult.classList.add('hidden');
  setTimeout(DisplayBySearch, 2000, inputText);
}


const searchHandle2 = () => {
  const inputField2 = document.getElementById('search-field2');
  const inputText2 = inputField2.value.toLowerCase();

  if (inputText2.length === 0) {
    alert('Please type something for search');
  }

  spinner.classList.remove('hidden');
  allPostContainer.classList.add('hidden');
  categoryPostContainer.classList.remove('hidden');
  noResult.classList.add('hidden');
  setTimeout(DisplayBySearch, 2000, inputText2);
}



/**                Set--- Mark ---As--Read                 */



const markAsRead = (title, view) => {
  const mark = document.createElement('div');
  mark.classList = 'px-5'
  mark.innerHTML = `
  <div class="flex my-4  mx-auto rounded-xl pl-2 py-2 justify-between bg-white">
                    <div class="font-mulish my-3 text-left font-bold text-xl">${title}</div>
                    <div class="flex items-center gap-2 pr-2">
                      <i class="fa-solid fa-eye"></i><span>${view}</span>
                    </div>
                  </div>
  `
  markPostContainer.appendChild(mark);
  readCount();
}




/**                           Get--- Count                 */


let count = 0;
const readCount = () => {
  count++;
  const readCount = document.getElementById('read-count');
  readCount.innerText = `(${count})`;
}


loadPostData();
loadLatestPostData();