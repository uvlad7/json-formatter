// chrome.devtools.panels.create("JSON",
//     "../icons/32.png",
//     "/devtools/panel.html",
//     function (panel) {
//     });

chrome.storage.sync.get({
    createElementsPane: true
}, function (items) {
    if (items.createElementsPane) {
        chrome.devtools.panels.elements.createSidebarPane("JSON",
            function (sidebar) {
                sidebar.setPage("/devtools/panel.html");
                sidebar.setHeight("8ex");
                chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
                        chrome.devtools.inspectedWindow.eval("(" + function () {
                            // console.log($0.tagName);
                            // if ($0.tagName === 'SCRIPT' && $0.type === "application/json") {
                            //     return $0.innerText;
                            // }
                            let res;
                            if ($0.nodeType === Node.TEXT_NODE) {
                                res = document.evaluate("./ancestor::script[@type='application/json']", $0, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                                return res === null ? [] : [res.innerText]
                            } else {
                                res = document.evaluate("./descendant-or-self::script[@type='application/json']", $0, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                                return [...Array(res.snapshotLength).keys()].map((i) => {
                                    return res.snapshotItem(i).innerText;
                                })
                            }
                        }.toString() + ")()", {useContentScriptContext: true},
                            (result, exceptionInfo) => {
                                if (typeof exceptionInfo !== 'undefined') {
                                    console.log(result);
                                    console.log(exceptionInfo);
                                } else {
                                    let obj = result.map((el) => {
                                        try {
                                            return JSON.parse(el);
                                        } catch (err) {
                                        }
                                    }).filter(x => x);
                                    if (obj.length === 0) {
                                        sidebar.setObject(null, 'No JSON selected');
                                    } else if (obj.length === 1) {
                                        sidebar.setObject(obj[0], 'Selected JSON');
                                    } else {
                                        sidebar.setObject(obj, 'Selected JSONs');
                                    }
                                }
                            });
                    }
                );
            }
        );
    }
});
