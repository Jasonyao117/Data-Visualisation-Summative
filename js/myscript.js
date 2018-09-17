//works
$(function(){
	console.log("hi");
	let key = 'SoHrJ7hCREJMhtXKdvUOGhmKGNdXp6be';

	let projectHTML = $('#templateProject').text();
	let projectTemplate = Template7(projectHTML).compile();


	let urlProjects = 'https://api.behance.net/v2/users/blugraphic/projects?client_id=' + key;


	$.ajax({
		url:urlProjects,
		dataType:'jsonp',
		success:function(res){
			// console.log(res);
			_(res.projects).each(function(project){
				console.log(project);

				let output = projectTemplate(project);
				$('.project-container').append(output);
				
			});
		}
    });


    //Show individual projects
    let singleProjectHTML = $('#templateSingleProject').text();
    let singleProjectTemplate = Template7(singleProjectHTML).compile();

    $('#portfolioModal1').on('show.bs.modal',function(e){
    	let target = e.relatedTarget;
    	let projectid = $(target).data('projectid');
    	let urlProject = 'http://www.behance.net/v2/projects/'+projectid+'?api_key=' + key;

    	$.ajax({
			url:urlProject,
			dataType:'jsonp',
			success:function(res){
				let project = res.project;

				// console.log(project);

				var output = singleProjectTemplate(project);
				$('.single-project-container').empty();
				$('.single-project-container').append(output);

				
			}
	    });
    });


    //user details
    

    let teamMemberHTML = $('#templateTeamMember').text();
	let teamMemberTemplate = Template7(teamMemberHTML).compile();

	function getUserDetails(username){

		let urlUser = 'https://api.behance.net/v2/users/'+username+'?client_id=' + key;

		$.ajax({
			url:urlUser,
			dataType:'jsonp',
			success:function(res){
		

				var user = res.user;
				// _(res.projects).each(function(project){
				console.log(user);

				let output = teamMemberTemplate(user);
				$('.team-members').append(output);
					
				// });
			}
	    });
	}

	getUserDetails('melkhiah');
	getUserDetails('blugraphic');
	getUserDetails('MartaBevacqua');
	getUserDetails('kline_DS');

});