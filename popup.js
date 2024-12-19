document.getElementById("startTest").addEventListener("click", async () => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.textContent = "Testing...";
  
    try {
      const downloadSpeed = await testInternetSpeed();
      const uploadSpeed = await testUploadSpeed();
      resultsDiv.textContent = `Download Speed: ${downloadSpeed} Mbps, Upload Speed: ${uploadSpeed} Mbps`;
    } catch (error) {
      resultsDiv.textContent = "Error testing speed.";
      console.error("Speed test failed:", error);
    }
  });
  
  async function testInternetSpeed() {
    const startTime = Date.now();
    const fileUrl = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"; // Reliable file
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.blob(); // Ensure the file is downloaded
      const endTime = Date.now();
  
      const fileSize = 0.027; // File size in MB (Google logo is approx. 27 KB)
      const timeTaken = (endTime - startTime) / 1000; // Time in seconds
      const speedMbps = (fileSize * 8) / timeTaken; // Speed in Mbps
      return speedMbps.toFixed(2);
    } catch (error) {
      console.error("Speed test failed:", error);
      throw new Error("Unable to perform speed test. Please try again.");
    }
  }
  
  async function testUploadSpeed() {
    const startTime = Date.now();
    const fileSize = 0.1; // File size in MB for upload test (100 KB)

    // Ensure fileSize is a valid number and within a reasonable range
    if (fileSize <= 0 || fileSize > 1) {
        throw new Error("Invalid file size for upload test.");
    }

    const fileData = new Blob(new Array(Math.floor(fileSize * 1024 * 1024)).fill('a')); // Create a dummy file

    try {
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: fileData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000; // Time in seconds
        const speedMbps = (fileSize * 8) / timeTaken; // Speed in Mbps
        return speedMbps.toFixed(2);
    } catch (error) {
        console.error("Upload speed test failed:", error);
        throw new Error("Unable to perform upload speed test. Please try again.");
    }
  }
  