(function( $ ) {
    $.fn.hs_body = function (Id) {
        // Conf
        var Body            = '.hsj-body__dots';
        var List            = '.hsj-body__list-disease';
        
        var CanvasID        = 'hsj-body__canvas';
        
        var DotsActive      = 'hsb-body-map__body-active';
        var DiseaseActive   = 'hsj-body_active';
        
        //------------------------------------------------
        // Init
        function init() {
            setVars();
            setEvents();
            setStart();
        }
        //------------------------------------------------
        function setVars() {
            Canvas = document.getElementById(Id);
            ObCanvas = Canvas.getContext('2d');
            
            qSelf = $(Self);
            
            qBody = qSelf.find(Body);
            qList = qSelf.find(List);
            
            qDots = qBody.find('> div');
            qDiseases = qList.find(' > div');
            qWrapper = qSelf.find('.hsb-body-map__left');
            
            Canvas.width = qWrapper.width();
            Canvas.height = qWrapper.height();
            Width = $(window).width();
        }
        //------------------------------------------------
        function setEvents() {
            qDots.click(onClickDot);
            qDiseases.click(onClickDisease);
            
            qDots.mouseenter(onClickDot);
            qDiseases.mouseenter(onClickDisease);
            
            $(window).resize(onResize);
        }
        //------------------------------------------------
        function setStart() {
        }
        //------------------------------------------------
        // Functions
        function removeActive() {
            $('.'+DotsActive).removeClass(DotsActive);
            $('.'+DiseaseActive).removeClass(DiseaseActive);
        }
        //------------------------------------------------
        function setActive(num) {
            qBody.find('[data-dot="'+num+'"]').addClass(DotsActive);
            qList.find('[data-disease="'+num+'"]').addClass(DiseaseActive);
        }
        //------------------------------------------------
        function drawLine(start, end) {
            ObCanvas.beginPath();
            ObCanvas.lineWidth = 1;
            ObCanvas.strokeStyle = '#ffe63a';
            
            ObCanvas.moveTo(start.left, start.top);
            ObCanvas.lineTo(end.left, end.top);
            ObCanvas.stroke();
        }
        //------------------------------------------------
        function clearLine() {
            ObCanvas.clearRect(0, 0, Canvas.width, Canvas.height)
        }
        //------------------------------------------------
        function getCoords(num) {
            var dot = qBody.find('[data-dot="'+num+'"]');
            var txt = qList.find('[data-disease="'+num+'"]');
            
            var do_w = dot.width()/2;
            var do_h = dot.height()/2;
            
            var title_w = txt.find('.hsb-body-map__disease-title').width();
            var title_h = txt.find('.hsb-body-map__disease-title').height();
            
            if (txt.parent().hasClass('hsb-body-map__list-right')) {
                title_w = 0;
                title_w += 1;
            }
            
            return {
                'start' : {
                    'left': txt.offset().left - qWrapper.offset().left + title_w,
                    'top': txt.offset().top - qWrapper.offset().top + title_h + 2
                },
                'end' : {
                    'left': dot.offset().left - qWrapper.offset().left + do_h,
                    'top': dot.offset().top - qWrapper.offset().top + do_w
                }
            };
        }
        //------------------------------------------------
        function setAllActive(num) {
            qDots.addClass(DotsActive);
            clearLine();
            qList.find('[data-disease="'+num+'"]').addClass(DiseaseActive);
        }
        //------------------------------------------------
        function showDisease(num) {
            var dot = qBody.find('[data-dot="'+num+'"]');
            var txt = qList.find('[data-disease="'+num+'"]');
            
            var do_h = dot.height();
            
            txt.css({
                'top': dot.offset().top - qWrapper.offset().top - do_h
            });
        }
        // Actions
        //------------------------------------------------
        // Events
        function onClickDot() {
            var self = $(this);
            removeActive();            
            setActive(self.data('dot'));
            
            if (Width <= 767) {
                showDisease(self.data('dot'));
                return;
            }
            
            var coords = getCoords(self.data('dot'));
            clearLine()
            drawLine(coords.start, coords.end);
        }
        //------------------------------------------------
        function onClickDisease() {
            var self = $(this);
            
            if (Width <= 767) {                
                removeActive();
                var txt = qList.find('[data-disease="'+self.data('disease')+'"]');
                txt.css('top', '-100%');
                return;
            }
            
            removeActive();
            if (self.data('disease')==0) {
                setAllActive(0);
                return;
            }
            setActive(self.data('disease'));
            var coords = getCoords(self.data('disease'));
            clearLine();
            drawLine(coords.start, coords.end);
        }
        //------------------------------------------------
        function onResize() {
            Width = $(window).width();
        }
        // Properties
        //------------------------------------------------    
        // Vars
        var Self = this;
    
        var Canvas;
        var ObCanvas;
        
        var qWrapper;
        var qSelf;
        var qBody;
        var qList;
        var qDots;
        var qDiseases;
        
        var Width;
        //------------------------------------------------
        // Interface
        //------------------------------------------------
        //------------------------------------------------
        init();
    };
})(jQuery);