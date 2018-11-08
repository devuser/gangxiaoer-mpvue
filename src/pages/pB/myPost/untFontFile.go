package sysapi

import (
	"fmt"
	// "github.com/boyosoft/jdalphaserver/api/coms"
	"github.com/boyosoft/jdalphaserver/lib"
	// m "github.com/boyosoft/jdalphaserver/models"
	// gm "github.com/boyosoft/jdalphaserver/models/gangxiaoermodels"
	"io/ioutil"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	// "strconv"
	// "strings"
	// "time"
)

const (
	HKeyAlphaStaticFolder      = "alpha-static-folder"
	HKUploadPostAuxImageFolder = "upload-postauximage-folder"
	HKShortURLPrefix           = "image-shorturl-prefix"
)

func GetFontFile(c *gin.Context) {
	log.Info("GetFontFile")
	domain := c.Param("domain")
	log.Info("domain=" + domain)
	fontfile := c.Param("fontfile")
	log.Info("fontfile=" + fontfile)
	staticFolder := c.Request.Header.Get(HKeyAlphaStaticFolder)
	filePath := filepath.Join(staticFolder, fontfile)
	log.WithFields(log.Fields{
		"domain":       domain,
		"staticFolder": staticFolder,
		"fontfile":     fontfile,
		"filePath":     filePath,
	})

	if content, err := ioutil.ReadFile(filePath); err != nil {
		c.IndentedJSON(http.StatusNotFound,
			gin.H{
				"code":    lib.APIErrcodeNotExisted,
				"data":    "",
				"message": fmt.Sprintf("cant not find the font file %s", fontfile),
			})
	} else {
		c.Writer.WriteHeader(http.StatusOK)
		c.Writer.Write(content)
		c.Writer.Flush()
	}
}
