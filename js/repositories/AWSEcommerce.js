storeApp.factory ("ASWECommerceRepository", function ($http, $q, $sce) {
    var self = this;

    self.itemSearch = function (keyword) {
        var deffered = $q.defer ();
        var timestamp = new Date().toISOString();

        keyword = encodeURIComponent(keyword);
        timestamp = encodeURIComponent(timestamp.substr(0, timestamp.length - 5) + timestamp.substr(timestamp.length - 1));

        var sortedPairs = [
            'AWSAccessKeyId=AKIAIGCBAUL7ZNU73E3A',
            'AssociateTag=1114-5004-8668',
            'Condition=All',
            'Keywords=' + keyword,
            'Operation=ItemSearch',
            'ResponseGroup=Images%2CItemAttributes%2COffers%2CEditorialReview',
            'SearchIndex=All',
            'Service=AWSECommerceService',
            'Timestamp=' + timestamp,
            'Version=2011-08-01'
        ];

        var canonicalString = sortedPairs.join('&');

        var stringToSign = "GET\n" +
                "webservices.amazon.com\n" +
                "/onca/xml\n"
                + canonicalString;

        var signature2 = CryptoJS.HmacSHA256(stringToSign, "QJEqE8+lrMqLxEXOJUlns73hu3qCLCBxRppdbGzN");

        var url = "http://webservices.amazon.com/onca/xml?"
            + canonicalString
            + '&Signature=' + encodeURIComponent(signature2.toString(CryptoJS.enc.Base64));

        url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + "&format=XML";

        $http. get (url) .success (function (data) {
            var dataAsJson = new X2JS().xml_str2json(data);
            var items = dataAsJson.query.results.ItemSearchResponse.Items.Item;

            var itemList = [];

            _.forEach(items, function (item) {
                itemList.push ({
                    asin: item.ASIN,
                    image: (function (item) {
                        if (item.MediumImage) {
                            return item.MediumImage ? item.MediumImage.URL : item.ImageSets.ImageSet.MediumImage.URL;
                        }
                    })(item),
                    imageWidth: (function (item) {
                        if (item.MediumImage) {
                            return item.MediumImage.Width.__text;
                        }
                    })(item),
                    title: item. ItemAttributes.Title,
                    subtitle: (function (item) {
                        var subtitle = item.ItemAttributes.Author || item.ItemAttributes.Brand

                        if (typeof subtitle == "object") {
                            return subtitle.join(", ");
                        } else {
                            return subtitle;
                        }
                    })(item),
                    binding: item.ItemAttributes.Binding,
                    description: (function (item) {
                        if(item.EditorialReviews) {
                            return $sce.trustAsHtml(item.EditorialReviews.EditorialReview.Content)
                        }
                    })(item),
                    price: (function (item) {
                        if (item.OfferSummary) {
                            if (item.OfferSummary.LowestNewPrice) {
                                return item. OfferSummary.LowestNewPrice.Amount/100;
                            }
                        }
                    })(item)
                });
            });

            deffered.resolve (itemList);
        });

        return deffered.promise;
    };

    return self;
});
