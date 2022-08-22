exports.getAllAssetLocations = (req, res, next) => {
  conn.query("SELECT * FROM asset_vwcurrentlocation", function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 };

 exports.createAssetLocation = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [req.body.name, "pending"];
  conn.query(
      "call gcaassetmgmt_2_0.asset_uspupdateassetwhloc (company, assetid, location, worker, d, partsinstalled ) VALUES(?)",
      [values],
      function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
          status: "success",
          message: "Updated Asset Location",
      });
      }
  );
  };

 exports.getAssetLocation = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  pool.execute(
    "call dbo_uspassetlocationlookup (Company, Argument) VALUES(?)",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
 };

exports.updateAssetLocation = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  pool.execute(
    "call gcaassetmgmt_2_0.asset_uspupdateassetwhloc (company, assetid, location, worker, d, partsinstalled ) VALUES(?)",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "todo updated!",
      });
    }
  );
 };


 