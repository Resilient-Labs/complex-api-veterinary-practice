README for Complex API 1
Goal: Build a simple front-end app that uses data returned from one api to make a request to another api to create something that would be beneficial to a veterinary practice.

Idea: Create a pet store locator where a user can enter their address and they will receive a number of store locations within a certain parameter.

APIs Used

GEOCODE API - https://geocode.maps.co/search?q=${address_query}&api_key=6ab55fa363adb593355201dksf01fba

- used to find the longitude and latitude of the users input

LOCATIONIQ - https://api.locationiq.com/v1/nearby?key=${location_iq_api_key}&lat=${latitude}&lon=${longitude}&radius=10000&tag=shop:pet
-used to find pet stores located with 10000M of the users address
