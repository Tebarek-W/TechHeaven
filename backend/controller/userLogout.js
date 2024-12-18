async function userLogout(req, res) {
  try {
    
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, 
    });
    
    // Send success response
    res.status(200).json({
      message: "Logout successfully",
      success: true,
      error: false,
      data : [],
    });
  } catch (err) {
    // Handle any errors
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout
